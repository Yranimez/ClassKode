import React, { useEffect, useState } from "react";
import { FormInput } from "../../../../component/input/FormInput";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { DefaultButton } from "../../../../component/button/DefaultButton";
import { DataControllerTemplate } from "../../../../layout/grid/DataControllerTemplate";
import { DataControlView } from "../../../../component/datacontrolview/DataControlView";
import { DataControlViewItem } from "../../../../component/datacontrolview/DataControlViewItem";
import { GrView } from "react-icons/gr";
import { LuFileEdit } from "react-icons/lu";
import { LuFolderArchive } from "react-icons/lu";
import { LinkButton } from "../../../../component/button/LinkButton";
import useModal from "../../../../hook/useModal";
import { PassiveModal } from "../../../../component/modal/PassiveModal";
import useHandleChange from "../../../../hook/useHandleChange";
import useValidation from "../../../../hook/useValidation";
import { ViewCard } from "../../../../component/card/ViewCard";
import useArchiveEntry from "../../../../hook/useArchiveEntry";
import useDatabase from "../../../../hook/useDatabase";

export function ViewCoach() {
  const navigate = useNavigate();
  const params = useParams();
  const { state } = useLocation();
  const [get, post] = useDatabase();
  const [modalcontent, showModal, hideModal, getModal] = useModal();
  const [ArchiveEntry] = useArchiveEntry();
  const [
    Base,
    ValidateID,
    ValidateName,
    ValidateEmail,
    ValidatePhone,
    ValidateLink,
    ValidateCode,
    ValidateEmpty,
    ValidateCodeID,
    ValidateTitle,
  ] = useValidation();

  const [data, setData] = useState([state.data]);
  const [assigment, setAssignment] = useState([]);
  const [specialization, setSpecialization] = useState([]);
  const [academicyear, setAcademicYear] = useState([]);
  const [code, setCode] = useState("");
  const [confirmCode, setConfirmCode] = useState({
    Confirm: "",
  });
  const [validation, setValidation] = useState({
    Confirm: ValidateCode(confirmCode.Confirm),
  });

  const [dataChange] = useHandleChange(setConfirmCode);

  useEffect(() => {
    get("random-code-generator", setCode);
  }, [data]);

  useEffect(() => {
    try {
      post("academicyear-current", academicyear, setAcademicYear);
      post("coach-assignment", { SCHLID: data[0].SCHLID }, setAssignment);
      post(
        "coach-specialization",
        { SCHLID: data[0].SCHLID },
        setSpecialization
      );
    } catch (err) {
      navigate(-1);
    }
  }, [assigment, specialization, academicyear]);

  useEffect(() => {
    setValidation({
      Confirm: ValidateCode(confirmCode.Confirm, 4, 4, code),
    });
  }, [confirmCode]);

  return (
    <>
      <DataControllerTemplate
        title={"View A Coach"}
        description={"This module views a coach"}
        control={
          <>
            <DefaultButton
              class="btn-outline-secondary"
              icon={<IoMdArrowRoundBack />}
              function={() => navigate(-1)}
            />
            <LinkButton
              class="btn-warning px-2"
              icon={<LuFileEdit />}
              to={"/institution/coach/edit/" + params.id}
              state={{ data: data }}
              text={"Edit"}
            />
            <DefaultButton
              class="btn-danger px-2"
              icon={<LuFolderArchive />}
              function={() =>
                showModal(
                  "Modal",
                  "Archive Entry",
                  <>
                    <span>Type the code </span>
                    <span className="fw-bold text-black">{code}</span>
                    <span> to archive </span>
                    <span className="fw-bold text-black">
                      {data[0].FirstName.concat(" ", data[0].LastName)}
                    </span>
                  </>
                )
              }
              text={"Archive"}
            />
          </>
        }
        content={
          <>
            {data.map((item, i) => (
              <main key={i} className="px-0 py-3 m-0">
                <header>
                  <h1>
                    <span>{item.Gender === "Male" ? "Mr. " : "Ms. "}</span>
                    <span>{item.FirstName}</span>
                    <span>
                      {item.MiddleInitial !== (null || "")
                        ? " " + item.MiddleInitial + ". "
                        : " "}
                    </span>
                    <span>{item.LastName}</span>
                  </h1>
                </header>

                <DataControlView
                  content={
                    <>
                      <DataControlViewItem
                        label={"School ID"}
                        content={item.SCHLID}
                      />
                      <DataControlViewItem
                        label={"Department"}
                        content={item.Department}
                      />
                      <DataControlViewItem
                        label={"Contacts"}
                        content={
                          <>
                            <span className="d-block">{item.Phone}</span>
                            <span className="d-block">{item.Email}</span>
                            <span className="d-block">
                              <a href={item.Facebook} target="_blank">
                                {item.Facebook}
                              </a>
                            </span>
                          </>
                        }
                      />
                      <DataControlViewItem
                        label={"Created"}
                        content={item.CCH_Created}
                      />
                      <DataControlViewItem
                        label={"Status"}
                        content={
                          assigment.length > 0
                            ? assigment.map((item, i) =>
                                item.ACY_Code === academicyear[0].ACY_Code
                                  ? item.CoachType
                                  : "Not Available"
                              )
                            : "Not Available"
                        }
                      />
                      <DataControlViewItem
                        label={"Specialized Courses"}
                        content={
                          specialization.length > 0
                            ? specialization.map((item, i) =>
                                item.ACY_Code === academicyear[0].ACY_Code ? (
                                  <span className="d-block">{item.Course}</span>
                                ) : (
                                  "None"
                                )
                              )
                            : "None"
                        }
                      />
                    </>
                  }
                />
              </main>
            ))}
          </>
        }
        additional={
          <>
            <ViewCard
              height="20vh"
              title="Assignments"
              content={
                assigment.length > 0
                  ? assigment.map((item, i) => (
                      <li className="d-flex gap-2">
                        <span className="fw-semibold">{item.ACY_Code}</span>
                        <span className="">-</span>
                        <span className="">{item.CoachType}</span>
                      </li>
                    ))
                  : "None"
              }
            />
            <ViewCard
              height="20vh"
              title="Specialized Courses"
              content={
                specialization.length > 0
                  ? specialization.map((item, i) => (
                      <li className="d-flex gap-2">
                        <span className="fw-semibold">{item.ACY_Code}</span>
                        <span className="">-</span>
                        <span className="">{item.Course}</span>
                      </li>
                    ))
                  : "None"
              }
            />
          </>
        }
      />
      <PassiveModal
        id={"Modal"}
        title={modalcontent.Title}
        content={
          <>
            {modalcontent.Content}
            <FormInput
              hidden={true}
              id="Confirm"
              alert={validation.Confirm[0].Message}
              class={validation.Confirm[0].State[0]}
              success={validation.Confirm[0].State[1]}
              trigger={dataChange}
              value={confirmCode.Confirm}
              required={true}
            />
          </>
        }
        trigger={() =>
          ArchiveEntry(
            "archive-existing-coach",
            post,
            code,
            confirmCode.Confirm,
            data[0]
          )
        }
      />
    </>
  );
}
