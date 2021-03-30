import React, { useEffect } from "react";
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
import { createElement } from "@syncfusion/ej2-base";
import { enableRipple } from "@syncfusion/ej2-base";
import { DropDownList } from "@syncfusion/ej2-dropdowns";
import { useSelector } from "react-redux";
enableRipple(true);
const SchedulerComponent = (props) => {
  const data = [
    {
      Id: 2,
      Subject: "Meeting",
      StartTime: new Date(2018, 1, 15, 10, 0),
      EndTime: new Date(2018, 1, 15, 12, 30),
      IsAllDay: false,
      Status: "Completed",
      Priority: "High",
    },
  ];

  const departmentData = [{ Text: "DENTISTA", Id: 1, Color: "#9e5fff" }];

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

  useEffect(() => {
    if (dentistasData.length > 0) {
      dentistasData.map((item, index) => {
        item.Text = item?.person?.name;
        item.Id = item?.id;
        item.GroupId = 1;
        item.Color = "#bbdc00";
        item.Designation = "Dentista";
      });
    }
  }, [dentistasData]);

  const getConsultantName = (value) => {
    return value.resourceData[value.resource.textField];
  };

  const getConsultantImage = (value) => {
    let resourceName = getConsultantName(value);
    return resourceName.toLowerCase();
  };

  const getConsultantDesignation = (value) => {
    return value.resourceData.Designation;
  };

  const resourceHeaderTemplate = (props) => {
    return (
      <div className="template-wrap">
        <div className="specialist-category">
          <div className={"specialist-image " + getConsultantImage(props)} />
          <div className="specialist-name">{getConsultantName(props)}</div>
          <div className="specialist-designation">
            {getConsultantDesignation(props)}
          </div>
        </div>
      </div>
    );
  };

  const onPopupOpen = (args) => {
    if (args.type === "Editor") {
      // Create required custom elements in initial time
      if (!args.element.querySelector(".custom-field-row")) {
        let row = createElement("div", { className: "custom-field-row" });
        let formElement = args.element.querySelector(".e-schedule-form");
        formElement.firstChild.insertBefore(
          row,
          formElement.firstChild.firstChild
        );
        let container = createElement("div", {
          className: "custom-field-container",
        });
        let inputEle = createElement("input", {
          className: "e-field",
          attrs: { name: "EventType" },
        });
        container.appendChild(inputEle);
        row.appendChild(container);
        let drowDownList = new DropDownList({
          dataSource: [
            { text: "Public Event", value: "public-event" },
            { text: "Maintenance", value: "maintenance" },
            { text: "Commercial Event", value: "commercial-event" },
            { text: "Family Event", value: "family-event" },
          ],
          fields: { text: "text", value: "value" },
          value: args.data.EventType,
          floatLabelType: "Always",
          placeholder: "Event Type",
        });
        drowDownList.appendTo(inputEle);
        inputEle.setAttribute("name", "EventType");
      }
    }
  };

  // const editorTemplate = (props) => {
  //   return props !== undefined ? (
  //     <div>
  //       <input></input>
  //       <div>
  //         <p>testando</p>
  //       </div>
  //     </div>
  //   ) : (
  //     <div></div>
  //   );
  // };

  const onActionBegin = (args) => {
    console.log("args ->", args);

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

  //Field funciona como o mapeamento
  return (
    <>
      <ScheduleComponent
        // ref={(schedule) => (scheduleObj = schedule)}
        cssClass="schedule-drag-drop"
        width="100%"
        height="650px"
        currentView="Day"
        selectedDate={new Date(2021, 0, 1)}
        popupOpen={onPopupOpen.bind(this)}
        // editorTemplate={editorTemplate.bind(this)}
        // new Date(ano, mês, dia, hora, minuto, segundo, milissegundo);
        resourceHeaderTemplate={resourceHeaderTemplate.bind(this)}
        eventSettings={{
          dataSource: data,
          fields: {
            id: "Id",
            subject: { name: "Subject" },
            isAllDay: { name: "IsAllDay" },
            startTime: { name: "StartTime" },
            endTime: { name: "EndTime" },
            description: { title: "Reason", name: "Description" },
          },
        }}
        actionBegin={onActionBegin.bind(this)}
        group={{
          enableCompactView: false,
          resources: ["Departments", "Consultants"],
        }}
      >
        <ResourcesDirective>
          <ResourceDirective
            field="DepartmentID"
            title="Department"
            name="Departments"
            allowMultiple={false}
            dataSource={departmentData}
            textField="Text"
            idField="Id"
            colorField="Color"
          />
          <ResourceDirective
            field="ConsultantID"
            title="Dentista"
            name="Consultants"
            allowMultiple={false}
            dataSource={dentistasData}
            textField="Text"
            idField="Id"
            groupIDField="GroupId"
            colorField="Color"
          />
        </ResourcesDirective>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda, DragAndDrop]} />
      </ScheduleComponent>
    </>
  );
};

export default SchedulerComponent;
