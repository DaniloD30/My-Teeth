import React, { useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TableMat from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { ReactComponent as EditIcon } from "~/assets/icons/edit.svg";
import { ReactComponent as DeleteIcon } from "~/assets/icons/delete.svg";
import Search from "~/components/common/search/Search";
import SearchIcon from "@material-ui/icons/Search";
import MenuRange from "~/components/common/menuRange/MenuRange";

import Utils from "~/helpers/Utils";
import "./Table.scss";

import { Divider, Typography } from "@material-ui/core";

const StyledTableCell = withStyles((theme) => ({
  head: {},
  body: {
    fontSize: 14,
  },
}))(TableCell);

const useStyles = makeStyles((theme) => ({
  search: {
    width: 250,
    float: "left",
    marginRight: 10,
    marginLeft: 10,
  },
  paperSearch: {
    marginBottom: 10,
    // height: 42,
    display: "flex",
    justifyContent: "space-between",
    padding: 5,
    right: 0,
    top: 30,
    width: "100%",
  },
}));

const Table = (props) => {
  const { dataSource, detail, excluir, editar } = props;
  const styleProps = { background: props.backgroundChanged };
  const classes = useStyles(styleProps);
  const [selectedRow, setSelectedRow] = React.useState("");

  const [dataObject, setDataObject] = React.useState([]);

  useEffect(() => {
    if (dataSource) {
      setDataObject(dataSource);
    } else {
      setDataObject([]);
    }
  }, [dataSource]);

  const filterDataArray = (search) => {
    if (dataSource) {
      let result = Utils.filterData(dataSource, search);
      setDataObject(result);
    } else {
      setDataObject([]);
    }
  };

  const onClickRow = (row) => {
    props.onSelect && props.onSelect(row);
    setSelectedRow(row.Id);
  };

  const setBackgroundRow = (row, style) => {
    if ((selectedRow === row.Id && props.onSelect) || props.rowID === row) {
      return style.rootSelected;
    }
  };

  return (
    <>
      <div className="table-result" style={{ marginTop: "10px" }}>
        <Paper style={{ color: "#f8f8f8" }}>
          <div className={classes.paperSearch}>
            <div className={classes.search}>
              <Search
                id="searchAddressRegisterDriver"
                search={filterDataArray}
              />
            </div>
            {/* <div style={{ marginLeft: "10px", marginRight: "10px" }}>
              <MenuRange
                label={"Status"}
                value={"Ativos"}
                // onChange={(event) => handleStatus(event.target.value)}
                options={["Ativos", "Inativos", "Todos"]}
              />
            </div> */}

            {/* <div style={{ marginLeft: "10px" }}>
            <MenuRange
              label={"Mostrar"}
              // value={select}
              // onChange={(event) => selectChange(event.target.value)}
              options={[10, 25, 50, 100, 250, 500]}
            />
          </div> */}
          </div>
        </Paper>
        <Divider />
        <TableContainer
          component={Paper}
          style={{ borderRadius: 0, boxShadow: "none" }}
        >
          <TableMat size="small" aria-label="a dense table">
            <TableHead>
              <TableRow className={classes.tableRow}>
                {props.columns.map((col, i) => (
                  <StyledTableCell
                    key={i}
                    align={props.align ? props.align : "center"}
                  >
                    {col.labelRender ? (
                      <div>{col.labelRender(props.dataMain)}</div>
                    ) : (
                      <Typography
                        style={{ fontSize: "18px", color: "#AFC3D2" }}
                      >
                        {col.label}
                      </Typography>
                    )}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {dataObject.map((row, iRow) => (
                <TableRow
                  className={`${classes.root} ${setBackgroundRow(
                    row,
                    classes
                  )}`}
                  hover
                  key={iRow}
                  onClick={() => {
                    onClickRow(row);
                  }}
                  style={{ height: 15 }}
                  align="right"
                >
                  {props.columns.map((col, iCol) => (
                    <StyledTableCell key={iCol}>
                      <Typography
                        style={{ fontSize: "1em", color: "#3D5564" }}
                      >
                        {row[col.name] === null ? (
                          <p style={{color: "#29abe2", fontStyle: "italic"}}>
                            {col.label} não cadastrado
                          </p>
                        ) : row[col.name]}
                      </Typography>
                      {/* )} */}
                    </StyledTableCell>
                  ))}

                  <StyledTableCell align="center">
                    <span>
                      {editar && (
                        <span
                          style={{
                            color: "#6EC8AF",
                            marginRight: 10,
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            props.edit(iRow, row);
                          }}
                        >
                          <EditIcon />
                          Editar
                        </span>
                      )}

                      {excluir && (
                        <span
                          style={{
                            borderLeft: "1px solid #AFC3D2",
                            paddingLeft: 10,
                            color: "#AFC3D2",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            props.del(row);
                            //   props.delete(row);
                          }}
                        >
                          <DeleteIcon
                            style={{ height: 14, width: "auto", fill: "red" }}
                          />
                          Excluir
                        </span>
                      )}

                      {detail && (
                        <span
                          style={{
                            borderLeft: "1px solid #AFC3D2",
                            paddingLeft: 10,
                            color: "#AFC3D2",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            props.handleD(row);
                            //   props.delete(row);
                          }}
                        >
                          <SearchIcon />
                          Detalhar
                        </span>
                      )}
                    </span>
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </TableMat>
        </TableContainer>
      </div>
    </>
  );
};

export default Table;
