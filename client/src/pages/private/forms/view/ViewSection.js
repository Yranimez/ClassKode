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
import { DataViewerTemplate } from "../../../../layout/grid/DataViewerTemplate";
import { CollapseButton } from "../../../../component/button/CollapsButton";

export function ViewSection() {
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

  const [projection, setProjection] = useState([]);
  const [program, setProgram] = useState([]);
  const [data, setData] = useState([state.data]);
  const [code, setCode] = useState("");
  const [confirmCode, setConfirmCode] = useState({
    Confirm: "",
  });
  const [validation, setValidation] = useState({
    Confirm: ValidateCode(confirmCode.Confirm),
  });

  const [dataChange] = useHandleChange(setConfirmCode);

  useEffect(() => {
    post("sel-prg", program, setProgram);
    post("sel-sect-proj", { Section: data[0].Section }, setProjection);
  }, [data]);

  useEffect(() => {
    get("random-code-generator", setCode);
  }, []);

  useEffect(() => {
    setValidation({
      Confirm: ValidateCode(confirmCode.Confirm, 4, 4, code),
    });
  }, [confirmCode]);

  return (
    <>
      <DataViewerTemplate
        title={"View A Section"}
        description={"This module views a section"}
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
              to={"/institution/section/edit/" + params.id}
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
                      {data[0].Section}
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
                  <h6>{item.Section}</h6>
                  <h1 className="fw-bold custom-text-gradient pb-2">
                    {item.Section}
                  </h1>
                  <hr />
                  <ul className="m-0 p-0 d-flex gap-2">
                    <li className="border m-0 p-2 rounded">
                      <p className="m-0 p-0">
                        {program.map((prog, i) =>
                          prog.PRG_Code === item.PRG_Code
                            ? prog.Department
                            : null
                        )}
                      </p>
                    </li>
                  </ul>
                </header>
                <main className="p-3">
                  <section>
                    <CollapseButton
                      id="details"
                      title="Section Details"
                      content={
                        <DataControlView
                          content={
                            <>
                              <DataControlViewItem
                                label={"Academic Level"}
                                content={item.AcademicLevel}
                              />
                              <DataControlViewItem
                                label={"Level"}
                                content={
                                  <ul className="p-0 m-0">
                                    <li className="p-0 m-0">
                                      <DataControlViewItem
                                        label={"Semester:"}
                                        content={item.Semester}
                                      />
                                    </li>
                                    <li className="p-0 m-0">
                                      <DataControlViewItem
                                        label={"Year Level:"}
                                        content={item.YearLevel}
                                      />
                                    </li>
                                  </ul>
                                }
                              />
                            </>
                          }
                        />
                      }
                    />
                    <CollapseButton
                      id="projection"
                      title="Projection History"
                      content={
                        projection.length > 0
                          ? projection.map((item, i) => (
                              <li className="d-flex gap-2">
                                <span className="fw-semibold">
                                  {item.ACY_Code}
                                </span>
                                <span className="">-</span>
                                <span className="">
                                  {item.Section} ( {item.Population} Students )
                                </span>
                              </li>
                            ))
                          : "None"
                      }
                    />
                    <small>
                      <p className="text-secondary">
                        Date Created: {item.SCT_Created}
                      </p>
                    </small>
                  </section>
                </main>
              </main>
            ))}
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
            "archive-existing-section",
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
