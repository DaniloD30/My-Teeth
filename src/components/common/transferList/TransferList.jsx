import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { useSelector } from "react-redux";
// import List from "@material-ui/core/List";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
// import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import Select from "@material-ui/core/Select";
import SearchIcon from "@material-ui/icons/Search";
import { Box, ListSubheader, MenuItem, Typography } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import "./TransferList.scss";
const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
  },
  paper: {
    width: 500,
    height: 230,
    overflow: "auto",
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
  // title: {
  //   padding: 10,
  // },
  selectStyle: {
    width: 200,
  },
  table: {
    minWidth: 650,
  },
  title: {
    flex: "1 1 100%",
    padding: 10,
    // padding: "15px",
    font: " 500 18px Roboto, sans-serif !important",
  },
}));

const initial = [
  {
    idRecurso: 1,
    descricao: "Monitor de Pedidos",
    urlRecurso: "MonitorPedidos3",
    ativo: true,
    idUsuarioCriacao: 1,
    dataCriacao: "2020-07-09T22:10:46.22",
    idUsuarioAtualizacao: 1,
    dataAtualizacao: "2020-07-15T08:58:12.157",
    tenantId: "tpc",
    permissoes: ["Criar", "Vizualizar", "Editar", "Deletar"], //permissoes
  },
];
function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export default function TransferList(props) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState(initial);
  const [right, setRight] = React.useState([]);
  const profiles = useSelector((state) => state.profile?.profiles);
  const resources = useSelector((state) => state.resources?.resources);
  const [age] = React.useState(10);
  // const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  useEffect(() => {
    console.log("rightEdit ->", props.rightEdit);
    if (props.type === "recursosIndividualizados") {
      setLeft(resources); //recursos
      // console.log("resources ->", resources)
      let arr = [];
      if (props.rightEdit.map) {
        props.rightEdit.map((item) => {
          // console.log(" item right =>", item);
          // console.log(" item right =>", item.recursoPermissao);
          // console.log("obj ->", obj)
          arr.push(item.recursoPermissao);
        });
      }
      // if (props.rightEdit?.recursosPermissoes?.map) {
      //   props.rightEdit?.recursosPermissoes?.map((item) => {
      //     // console.log(" item right =>", item);
      //     // console.log(" item right =>", item.recursoPermissao);
      //     // console.log("obj ->", obj)
      //     arr.push(item.recursoPermissao);
      //     obj = {};
      //   });
      // }

      // if (props.rightEdit[0]?.recursoPermissao) {
      // console.log("props rightEdit ->", props.rightEdit?.recursoPermissao);
      setRight(arr);
      // }
    } else {
      setLeft(profiles); //profiles
      if (props.rightEdit?.perfis) {
        setRight(props.rightEdit?.perfis);
      }
      /**
       * Preciso do nome do perfil no objeto Usuario
       */
    }
  }, [resources, profiles, props.type, props.rightEdit]);

  /**
   * UseEffect responsavel para popular o "right", quando a opção for de editar o usuario (props.rightEdit)
   **/

  // useEffect(() => {
  //   if(rightEdit){
  //     setRight(right.concat(left));
  //   }
  //   props.handle(right, props.type);
  // }, [props]);

  useEffect(() => {
    props.handle(right, props.type);
  }, [right, props]);

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = (e) => {
    let arr = [];

    if (props.type === "recursosIndividualizados") {
      // e.acao = rowAction;
      // obj.permissoes = rowAction;
      // console.log(" e ->", e.target.value)

      // console.log("e ->", e.target.value)
      arr.push(e.target.value);
      console.log("right ->", right);
      console.log("e.target.value ->", e.target.value);
      let found = right.find((element) => element === e.target.value);

      if (found === undefined) {
        setRight((prev) => [...prev, e.target.value]);
        setLeft(not(left, arr));
      }
    } else {
      arr.push(e.target.value);
      setLeft(not(left, arr));
      setRight(right.concat(arr));
    }
    // console.log(" arr ->", arr);

    //

    setChecked(not(checked, arr));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const handleDeleteRight = (obj) => {
    console.log("obj ->", obj[0]);
    // setLeft(left.concat(rightChecked));
    // setRight(not(right, rightChecked));
    // right.map((value, i) => {
    //   if (value === obj[0]) {
    //     setRight(not(right, obj));
    //   }
    // });
    // for (let i = 0; i < right.length; i++) {
    //   if (right[i] === obj) {
    //     console.log("entrou")
    //     setRight(not(right, obj));
    //   }
    // }
  };
  // const customList = (items) => (
  //   <Paper id="transferList" className={classes.paper}>
  //     <Typography className={classes.title}>
  //       {" "}
  //       {props.type === "recursosIndividualizados"
  //         ? "Adicionar Recursos Individualizador"
  //         : "Perfil de Usuário"}
  //     </Typography>
  //     <List dense component="div" role="list">
  //       {items.map((value) => {
  //         const labelId = `transfer-list-item-${value}-label`;

  //         return (
  //           <ListItem
  //             key={value}
  //             role="listitem"
  //             button
  //             onClick={handleToggle(value)}
  //           >
  //             <ListItemIcon>
  //               <Checkbox
  //                 checked={checked.indexOf(value) !== -1}
  //                 tabIndex={-1}
  //                 disableRipple
  //                 inputProps={{ "aria-labelledby": labelId }}
  //               />
  //             </ListItemIcon>
  //             <ListItemText id={labelId} primary={`List item ${value + 1}`} />
  //             <ListItemText
  //               id={labelId}
  //               primary={`Descrição do produto que passa`}
  //             />
  //             <ListItemIcon>
  //               <Button
  //                 // onClick={(e) => {
  //                 //   props.edit(row);
  //                 // }}
  //                 color="primary"
  //               >
  //                 <EditIcon />
  //               </Button>
  //             </ListItemIcon>
  //             <ListItemIcon>
  //               <Button
  //                 // onClick={(e) => {
  //                 //   props.edit(row);
  //                 // }}
  //                 color="primary"
  //               >
  //                 <CloseIcon />
  //               </Button>
  //             </ListItemIcon>
  //           </ListItem>
  //         );
  //       })}
  //       <ListItem />
  //     </List>
  //   </Paper>
  // );

  const customList1 = (items) => (
    <TableContainer component={Paper}>
      <Typography
        className={classes.title}
        variant="h7"
        id="tableTitle"
        component="div"
      >
        {props.type === "recursosIndividualizados"
          ? "Adicionar Recursos Individualizados"
          : "Perfil de Usuário"}
      </Typography>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {/* <TableCell></TableCell> */}
            <TableCell></TableCell>
            <TableCell>Nome</TableCell>
            {props.type === "recursosIndividualizados" ? (
              <TableCell>Permissões</TableCell>
            ) : null}
            <TableCell align="center">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map(
            (value, i) => (
              console.log("value items ->", value),
              (
                <TableRow key={i} onClick={handleToggle(value)}>
                  {/* <Checkbox
                checked={checked.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ "aria-labelledby": "labelId" }}
              /> */}
                  <TableCell>
                    <Checkbox
                      checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {props.type === "recursosIndividualizados"
                      ? value?.recurso?.descricao
                      : value?.descricao}
                  </TableCell>
                  {props.type === "recursosIndividualizados" ? (
                    <TableCell component="th" scope="row">
                      {value?.permissao?.descricao}
                    </TableCell>
                  ) : null}
                  {props.type === "recursosIndividualizados" ? (
                    <TableCell align="center">
                      {" "}
                      <Button
                        onClick={(e) => {
                          handleDeleteRight(items);
                        }}
                        color="primary"
                      >
                        <CloseIcon />
                      </Button>
                    </TableCell>
                  ) : (
                    <TableCell align="center">
                      {" "}
                      <Button
                        // onClick={(e) => {
                        //   props.edit(row);
                        // }}
                        color="primary"
                      >
                        <EditIcon />
                      </Button>
                      <Button
                        onClick={(e) => {
                          handleDeleteRight(items);
                        }}
                        color="primary"
                      >
                        <CloseIcon />
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              )
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );

  // const handleChange = (event) => {
  //   setAge(event.target.value);
  // };

  return (
    <Grid
      container
      spacing={2}
      //   justify="center"
      //   alignItems="center"
      className={classes.root}
    >
      <Grid item>
        <FormControl className={classes.formControl}>
          <Typography className={classes.title}>
            {props.type === "recursosIndividualizados"
              ? "Selecione o Recurso"
              : "Perfil"}
          </Typography>
          {props.type === "recursosIndividualizados" ? (
            <Select
              className={classes.selectStyle}
              IconComponent={() => <SearchIcon />}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              onChange={handleCheckedRight}
            >
              {/* {left.map((row, index) => (
                <MenuItem value={row}>{row[index]}</MenuItem>;
                  
              ))} */}
              {left &&
                left.map((row, i) => (
                  <MenuItem key={i} value={row}>
                    {row?.recurso?.descricao} - {row?.permissao?.descricao}
                  </MenuItem>
                ))}
            </Select>
          ) : (
            <Select
              className={classes.selectStyle}
              IconComponent={() => <SearchIcon />}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              onChange={handleCheckedRight}
            >
              {/* {left.map((row, index) => (
              <MenuItem value={row}>{row[index]}</MenuItem>;
                
            ))} */}

              {left &&
                left.map((row, i) => (
                  <MenuItem key={i} value={row}>
                    {row?.descricao}
                  </MenuItem>
                ))}

              {/* <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem> */}
            </Select>
          )}
        </FormControl>
        {/* 
        <Select IconComponent={() => <SearchIcon />}>
          <MenuItem
            data-id={"menu-range-"}
            className={"selectItem"}
            value={age}
            onChange={handleChange}
          >
            <MenuItem value={10}>dasdaadsa</MenuItem>
            <MenuItem value={20}>dasda</MenuItem>
            <MenuItem value={30}>dadasd</MenuItem>
          </MenuItem>
        </Select> */}
      </Grid>
      <Grid item>
        <Grid container justify="center" direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedLeft}
            // disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &lt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleAllRight}
            disabled={left.length === 0}
            aria-label="move all right"
          >
            ≫
          </Button>
          {/* 
      
          {props.type === "recursosIndividualizados" ? null : (
            <Button
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={handleCheckedLeft}
              // disabled={rightChecked.length === 0}
              aria-label="move selected left"
            >
              &lt;
            </Button>
          )}

          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleAllLeft}
            disabled={right.length === 0}
            aria-label="move all left"
          >
            ≪
          </Button> */}
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleAllLeft}
            disabled={right.length === 0}
            aria-label="move all left"
          >
            ≪
          </Button>
        </Grid>
      </Grid>

      <Grid item>{customList1(right)}</Grid>
    </Grid>
  );
}
