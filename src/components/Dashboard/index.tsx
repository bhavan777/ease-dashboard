import {
  ArrowDownwardOutlined,
  ArrowUpwardOutlined,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  LinearProgress,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_CURRENT_PAGE = 1;

enum Ids {
  NAME = "name",
  ADDRESS = "address",
  BLOOD_GROUP = "bloodGroup",
  LAST_APPOINTMENT = "lastAppointment",
}
interface IData {
  name: string;
  bloodGroup: string;
  address: string;
  lastAppointment: string;
}

interface HeadCell {
  id: keyof IData;
  label: string;
  sortable: boolean;
  type?: "string" | "date";
  align?: "center" | "right" | "left";
}

type ISortState = {
  [k in Ids]: "asc" | "desc" | undefined;
};

const getAddressFromLocation = (location: any): string => {
  // temporarily only picking string lines to concat to show a address
  return Object.values(location)
    .filter((line) => typeof line === "string")
    .join(", ");
};
export const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(DEFAULT_CURRENT_PAGE);

  const [sortState, setSortState] = useState<ISortState>({
    name: undefined,
    bloodGroup: undefined,
    address: undefined,
    lastAppointment: undefined,
  });

  const [response, setResponse] = useState<any[] | null>(null);

  const formattedResponse: IData[] = useMemo(() => {
    if (!response) {
      return [];
    }
    return response.map((row) => ({
      key: "row.",
      name: `${row.name.title} ${row.name.first} ${row.name.last}`,
      bloodGroup: ["A+", "B-", "AB+", "O+"][Math.floor(Math.random() * 4)],
      address: getAddressFromLocation(row.location),
      lastAppointment: new Intl.DateTimeFormat("en-US").format(
        new Date(row.registered.date)
      ),
    }));
  }, [response]);

  const tableData = useMemo(() => {
    if (sortState.lastAppointment) {
      return formattedResponse.sort((a, b) => {
        const timeA = new Date(a.lastAppointment).getTime();
        const timeB = new Date(b.lastAppointment).getTime();
        const diff =
          sortState.lastAppointment === "asc" ? timeA - timeB : timeB - timeA;
        return diff > 0 ? 1 : -1;
      });
    } else {
      let key: keyof IData;
      if (sortState.address) {
        key = "address";
      } else if (sortState.bloodGroup) {
        key = "bloodGroup";
      } else {
        key = "name";
      }
      return formattedResponse.sort((a, b) => {
        const itemA: any = a[key];
        const itemB: any = b[key];
        const diff = sortState[key] === "asc" ? itemA > itemB : itemB > itemA;
        return diff ? 1 : -1;
      });
    }
  }, [formattedResponse, sortState]);

  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const res = await fetch(
      `https://randomuser.me/api/?page=${page}&results=${DEFAULT_PAGE_SIZE}`
    ).then((res) => res.json());
    setResponse(res.results);
    setIsLoading(false);
  }, [page]);

  useEffect(() => {
    fetchData();
  }, [page]);

  const onPaginationChange = useCallback(
    (_e: React.ChangeEvent<unknown>, page: number) => {
      debugger;
      setPage(page);
    },
    []
  );

  const headCells: readonly HeadCell[] = [
    {
      id: "name",
      label: "Patient Name",
      sortable: true,
    },
    {
      id: "address",
      label: "Patient's Address",
      sortable: true,
    },
    {
      id: "bloodGroup",
      label: "Patient's Blood Group",
      sortable: true,
      align: "center",
    },
    {
      id: "lastAppointment",
      label: "Patient's last Appointment",
      sortable: true,
      align: "right",
    },
  ];

  const handleColumnSort = (th: HeadCell) => () => {
    if (!th.sortable) {
      return;
    }
    const newSortState =
      sortState[th.id] === undefined || sortState[th.id] === "desc"
        ? "asc"
        : "desc";
    const updateSortState: ISortState = {
      name: undefined,
      bloodGroup: undefined,
      address: undefined,
      lastAppointment: undefined,
      [th.id]: newSortState,
    };
    setSortState(updateSortState);
  };

  const tableheader = (
    <TableHead>
      <TableRow>
        {headCells.map((th) => {
          return (
            <TableCell
              sx={{
                fontWeight: sortState[th.id] !== undefined ? 500 : 400,
                textAlign: th.align ?? "left",
              }}
            >
              <Button
                onClick={handleColumnSort(th)}
                color="inherit"
                variant="text"
                startIcon={
                  <TableSortLabel
                    active={!!sortState[th.id]}
                    direction={sortState[th.id]}
                  />
                }
              >
                {th.label}
              </Button>
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );

  const tableBody =
    isLoading && !tableData.length ? (
      <tr>
        <td colSpan={headCells.length}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="100%"
            minHeight={400}
          >
            <CircularProgress size={32} />
          </Box>
        </td>
      </tr>
    ) : (
      <TableBody>
        {tableData.map((row, rowIndex) => (
          <TableRow
            key={row.name}
            onClick={() => {
              navigate(`/patients/${rowIndex}`);
            }}
            sx={{
              cursor: isLoading ? "not-allowed" : "pointer",
              ":hover": {
                backgroundColor: "#FAFAFA",
                transition: "all 0.2s ease",
              },
            }}
          >
            {headCells.map((cell) => (
              <TableCell
                sx={{
                  fontWeight: sortState[cell.id] !== undefined ? 500 : 400,
                  textAlign: cell.align ?? "left",
                  opacity: isLoading ? 0.4 : 1,
                }}
                key={row.name + cell.id}
              >
                {row[cell.id]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    );
  return (
    <Box padding={1}>
      <Paper elevation={2}>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size={"medium"}
        >
          {tableheader}
          {tableBody}
        </Table>
        <Box display="flex" justifyContent="flex-end" paddingY="16px">
          <Pagination
            count={10}
            page={+(page ?? DEFAULT_CURRENT_PAGE)}
            onChange={onPaginationChange}
          />
        </Box>
      </Paper>
    </Box>
  );
};
