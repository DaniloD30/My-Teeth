import React, { useEffect, useState, useRef } from "react";
import "./SchedulerComponent.scss";
import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-buttons/styles/material.css";
import "@syncfusion/ej2-calendars/styles/material.css";
import "@syncfusion/ej2-dropdowns/styles/material.css";
import "@syncfusion/ej2-inputs/styles/material.css";
import "@syncfusion/ej2-lists/styles/material.css";
import "@syncfusion/ej2-navigations/styles/material.css";
import "@syncfusion/ej2-popups/styles/material.css";
import "@syncfusion/ej2-splitbuttons/styles/material.css";
import "@syncfusion/ej2-react-schedule/styles/material.css";
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
  DragAndDrop,
  ResourcesDirective,
  ResourceDirective,
} from "@syncfusion/ej2-react-schedule";
// import { createElement } from "@syncfusion/ej2-base";
import { enableRipple } from "@syncfusion/ej2-base";
// import { DropDownList } from "@syncfusion/ej2-dropdowns";
import { useSelector } from "react-redux";
// import { Box, TextField } from "@material-ui/core";
import PopUp from "./PopUp";
import { Avatar, Typography } from "@material-ui/core";
import Utils from "~/helpers/Utils";
// import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
// import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
enableRipple(true);
const SchedulerComponent = ({ dataAppointment }) => {
  // const dataS = [
  //   {
  //     Id: 5,
  //     Subject: "ISA Annual Conference",
  //     StartTime: "2018-02-15T04:30:00.000Z",
  //     EndTime: "2018-02-15T06:00:00.000Z",
  //     EventType: "commercial-event",
  //     City: "USA",
  //     CategoryColor: "#00bdae",
  //   },
  // ];
  const scheduler = useRef();

  const departmentData = [{ text: "DENTISTA", Id: 1, Color: "#9e5fff" }];
  const [dentistas, setDentista] = useState([]);
  const [flag, setFlag] = useState(false);
  const [flagEdit, setFlagEdit] = useState(false);
  const [paciente, setPaciente] = useState([]);
  const [args, setArgs] = useState(null);
  // const [data, setData] = useState([]);
  // const consultantData = [
  //   {
  //     Text: "Alice",
  //     Id: 1,
  //     GroupId: 1,
  //     Color: "#bbdc00",
  //     Designation: "Cardiologist",
  //   },
  //   {
  //     Text: "Nancy",
  //     Id: 2,
  //     GroupId: 1,
  //     Color: "#9e5fff",
  //     Designation: "Orthodontist",
  //   },
  //   {
  //     Text: "Robert",
  //     Id: 3,
  //     GroupId: 1,
  //     Color: "#bbdc00",
  //     Designation: "Optometrist",
  //   },
  //   {
  //     Text: "Robson",
  //     Id: 4,
  //     GroupId: 1,
  //     Color: "#9e5fff",
  //     Designation: "Periodontist",
  //   },
  //   {
  //     Text: "Laura",
  //     Id: 5,
  //     GroupId: 1,
  //     Color: "#bbdc00",
  //     Designation: "Orthopedic",
  //   },
  //   {
  //     Text: "Margaret",
  //     Id: 6,
  //     GroupId: 1,
  //     Color: "#9e5fff",
  //     Designation: "Endodontist",
  //   },
  // ];

  const dentistasData = useSelector((state) => state.user?.dentista);
  const pacientesData = useSelector((state) => state.user?.cliente);

  // const appointmentsData = useSelector(
  //   (state) => state.appointment?.appointments
  // );

  useEffect(() => {
    if (dentistasData?.length > 0) {
      dentistasData.forEach((item) => {
        if (item) {
          // console.log("item ->", item)
          item.Text = item?.person?.name;
          item.Id = item?.id;
          item.GroupId = 1; // grupo de dentistas
          item.Color = "#2e3192"; //Cada dentista tem que ter uma cor
          // pode vim DO BACKEND ( MELHOR )
          item.Designation = "Dentista"; // necessario isso para o scheduler
        }
      });
      // dentistasData.map((item, index) => {
      //   if (item) {
      //     item.Text = item?.person?.name;
      //     item.Id = item?.id;
      //     item.GroupId = 1; // grupo de dentistas
      //     item.Color = "#bbdc00"; //Cada dentista tem que ter uma cor
      //     item.Designation = "Dentista";
      //   }

      // });
      setDentista(dentistasData);
    }
    if (pacientesData?.length > 0) {
      pacientesData.map((item, index) => (item.Text = item?.person?.name));
      setPaciente(pacientesData);
    }
    // if (appointmentsData.length > 0) {
    // console.log("data ->", appointmentsData);
    // appointmentsData.map((item, index) => {
    // item.Subject = item?.note;
    // item.Id = item?.id;
    // Id: 5,
    // Subject: "ISA Annual Conference",
    // StartTime: "2018-02-15T04:30:00.000Z",
    // EndTime: "2018-02-15T06:00:00.000Z",
    // });
    // setData(dataS);
    // }
  }, [dentistasData, pacientesData]);

  const getConsultantName = (value) => {
    return value.resourceData[value.resource.textField];
  };

  const getConsultantImage = (value) => {
    // Testar imagem do dentista
    // console.log("props image ->",  value?.resourceData)
    let file = `data:image/png;base64, ${Utils._arrayBufferToBase64(
      value?.resourceData?.person?.picture?.data
    )}`;
    return file;
  };

  const getConsultantDesignation = (value) => {
    return value.resourceData.Designation;
  };

  const resourceHeaderTemplate = (props) => {
    return (
      <div className="template-wrap">
        <div className="specialist-category">
          {/* <div className={"specialist-image " + getConsultantImage(props)} /> */}
          <Avatar src={getConsultantImage(props)} />
          <div className="specialist-name">{getConsultantName(props)}</div>
          <div className="specialist-designation">
            {getConsultantDesignation(props)}
          </div>
        </div>
      </div>
    );
  };

  // const onPopupOpen = (args) => {
  //   if (args.type === "Editor") {
  //     // Create required custom elements in initial time
  //     if (!args.element.querySelector(".custom-field-row")) {
  //       let row = createElement("div", { className: "custom-field-row" });
  //       let formElement = args.element.querySelector(".e-schedule-form");
  //       formElement.firstChild.insertBefore(
  //         row,
  //         formElement.firstChild.firstChild
  //       );
  //       let container = createElement("div", {
  //         className: "custom-field-container",
  //       });
  //       let inputEle = createElement("input", {
  //         className: "e-field",
  //         attrs: { name: "EventType" },
  //       });
  //       container.appendChild(inputEle);
  //       row.appendChild(container);
  //       let drowDownList = new DropDownList({
  //         dataSource: [
  //           { text: "Public Event", value: "public-event" },
  //           { text: "Maintenance", value: "maintenance" },
  //           { text: "Commercial Event", value: "commercial-event" },
  //           { text: "Family Event", value: "family-event" },
  //         ],
  //         fields: { text: "text", value: "value" },
  //         value: args.data.EventType,
  //         floatLabelType: "Always",
  //         placeholder: "Event Type",
  //       });
  //       drowDownList.appendTo(inputEle);
  //       inputEle.setAttribute("name", "EventType");
  //     }
  //   }
  // };

  // const editorTemplateS = (props) => {
  //   //   "appointmentsType_id":4,
  //   // "userdentist_id":24,
  //   // "userpatient_id":14,
  //   // "userregistered_id":24,
  //   // "clinic_id":4,
  //   // "StartTime": "2020-07-13 17:00:00",
  //   // "EndTime": "2020-07-13 18:00:00"  item.DepartmentID = 1;
  //   // item.IsAllDay = false;
  //   return props !== undefined ? (
  //     <Box style={{ padding: "10px" }}>
  //       <TextField id="standard-basic" name="note" label="Título" />
  //       <TextField
  //         id="standard-basic"
  //         name="userdentist_id"
  //         label="userdentist_id"
  //       />
  //       <TextField
  //         id="standard-basic"
  //         name="DepartmentID"
  //         label="DepartmentID"
  //       />
  //       <TextField id="standard-basic" name="IsAllDay" label="IsAllDay" />
  //       <TextField
  //         id="standard-basic"
  //         name="userpatient_id"
  //         label="userpatient_id"
  //       />
  //       <TextField
  //         id="standard-basic"
  //         name="userregistered_id"
  //         label="userregistered_id"
  //       />
  //       <TextField id="standard-basic" name="clinic_id" label="clinic_id" />
  //       <TextField
  //         id="standard-basic"
  //         name="appointmentsType_id"
  //         label="appointmentsType_id"
  //       />
  //       <TextField id="standard-basic" name="note" label="StartTime" />
  //       <TextField id="standard-basic" name="note" label="EndTime" />
  //     </Box>
  //   ) : (
  //     <div></div>
  //   );
  // };

  const onActionBegin = (args) => {
    // console.log("args ->", args);
    // Consigo obter as actions do scheduler aqui
    //CRUD HERE

    /*
    Post -> Objeto
    Delete -> Index 
    Edit -> Objeto + ID

    */
    // let weekEnds = [0, 6];
    // if (args.requestType == 'eventCreate' && weekEnds.indexOf((args.data[0].StartTime).getDay()) >= 0) {
    //     args.cancel = true;
    // }
  };

  const openModal = (e) => {
    if (e?.event?.note) {
      setFlagEdit(true);
    }
    setArgs(e);
    setFlag(true);
  };

  const closeModal = () => {
    setFlag(false);
    setFlagEdit(false);
  };

  const template = (props) => {
    // console.log("props ->", props);
    return (
      <div>
        <Typography variant="h5">{props.note}</Typography>
        <Typography variant="h7">
          {props.hour} ||{" "}
          <span style={{ fontWeight: "bolder" }}>
            &nbsp;{props.appointments_status?.status}
          </span>
        </Typography>
        {/* <div>{props.appointments_status?.status}</div> */}
      </div>
    );
  };

  // const testE = (e) => {
  //   console.log("teste double", e)
  // }
  return (
    <>
      <ScheduleComponent
        // ref={(schedule) => (scheduleObj = schedule)}
        // cssClass="schedule-drag-drop"
        width="100%"
        height="100%"
        currentView="Day"
        // selectedDate={new Date(2020, 6, 13)}
        ref={scheduler}
        popupOpen={(args) => {
          args.cancel = true;
        }}
        // popupOpen={onPopupOpen.bind(this)}
        // editorTemplate={editorTemplate.bind(this)}
        actionBegin={onActionBegin.bind(this)}
        eventClick={(args) => {
          openModal(args);
        }}
        cellClick={(e) => {
          openModal(e);
        }}
        // cellDoubleClick={(e) => {testE(e)}}
        // cellDoubleClick={alert("double click")}
        // new Date(ano, mês, dia, hora, minuto, segundo, milissegundo);
        resourceHeaderTemplate={resourceHeaderTemplate.bind(this)}
        eventSettings={{
          dataSource: dataAppointment,
          template: template.bind(this),
          fields: {
            id: "Id",
            subject: { name: "note" },
            isAllDay: { name: "IsAllDay" },
            startTime: { name: "StartTime" },
            endTime: { name: "EndTime" },
            // description: { title: "Reason", name: "Description" },
          },
          // fields: {
          //   id: "Id",
          //   subject: { name: "Subject" },
          //   isAllDay: { name: "IsAllDay" },
          //   startTime: { name: "StartTime" },
          //   endTime: { name: "EndTime" },
          //   description: { title: "Reason", name: "Description" },
          // },
        }}
        group={{
          enableCompactView: false,
          resources: ["Departments", "Consultants"],
        }}
      >
        <ResourcesDirective>
          {/* <ResourceDirective
            field="DepartmentID"
            title="Department"
            name="Departments"
            allowMultiple={false}
            dataSource={departmentData}
            textField="Text"
            idField="Id"
            colorField="Color"
          /> */}
          <ResourceDirective
            field="userdentist_id"
            title="Dentista"
            name="Consultants"
            allowMultiple={false}
            dataSource={dentistas}
            textField="Text"
            idField="Id"
            groupIDField="GroupId"
            colorField="Color"
          />
        </ResourcesDirective>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda, DragAndDrop]} />
      </ScheduleComponent>
      <PopUp
        flagOpen={flag}
        handleClose={closeModal}
        dentista={dentistas}
        pacientes={paciente}
        departmentData={departmentData}
        dataArg={args}
        flagEdit={flagEdit}
      />
    </>
  );
};

export default SchedulerComponent;
