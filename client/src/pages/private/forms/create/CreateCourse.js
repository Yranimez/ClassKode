import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormInput } from "../../../../component/input/FormInput";
import { GrView } from "react-icons/gr";
import { DefaultButton } from "../../../../component/button/DefaultButton";
import { IoMdArrowRoundBack } from "react-icons/io";
import { DataControllerTemplate } from "../../../../layout/grid/DataControllerTemplate";
import { RadioGroup } from "../../../../component/radiogroup/RadioGroup";
import { RadioButton } from "../../../../component/radiogroup/RadioButton";
import { MultipleFormInput } from "../../../../component/input/MultipleFormInput";
import { MultipleFormInputItem } from "../../../../component/input/MultipleFormInputItem";
import { SelectButtonItemSelected } from "../../../../component/dropdown/select/SelectButtonItemSelected";
import { SelectButtonItem } from "../../../../component/dropdown/select/SelectButtonItem";
import { SelectButton } from "../../../../component/dropdown/select/SelectButton";
import useHandleChange from "../../../../hook/useHandleChange";
import useValidation from "../../../../hook/useValidation";
import useValidate from "../../../../hook/useValidate";
import useDatabase from "../../../../hook/useDatabase";

export function CreateCourse() {
  const navigate = useNavigate();
  const [get, post] = useDatabase();

  const [course, setCourse] = useState([]);
  const [program, setProgram] = useState([]);
  const [academiclevel, setAcademicLevel] = useState([]);
  const [data, setData] = useState({
    CRS_Code: "",
    Course: "",
    PRG_Code: "",
  });

  const [dataChange] = useHandleChange(setData);

  useEffect(() => {
    post("sel-crs", course, setCourse);
    post("sel-acyl", academiclevel, setAcademicLevel);
    post("sel-prg", program, setProgram);
  }, [course]);

  const submitForm = (e) => {
    e.preventDefault();
    if (true) {
      post("ins-crs", data, setData);
      navigate(-1);
    }
  };

  return (
    <form className="h-100" onSubmit={submitForm}>
      <DataControllerTemplate
        title={"Create A Course"}
        description={"This module creates a course"}
        control={
          <>
            <DefaultButton
              class="btn-outline-secondary"
              type="button"
              icon={<IoMdArrowRoundBack />}
              function={() => navigate(-1)}
            />
            <DefaultButton
              class="btn-success px-2"
              type="submit"
              text="Submit"
            />
          </>
        }
        entryform={
          <>
            <FormInput
              label="Course Code"
              id="CRS_Code"
              trigger={dataChange}
              value={data.CRS_Code}
              required={true}
            />

            <FormInput
              label="Course"
              id="Course"
              trigger={dataChange}
              value={data.Course}
              required={false}
            />

            <SelectButton
              label="Program"
              id="PRG_Code"
              trigger={dataChange}
              required={true}
              option={
                <>
                  <SelectButtonItemSelected
                    content={program.map((option, i) => (
                      <>
                        {option.PRG_Code === data.PRG_Code
                          ? option.Program
                          : ""}
                      </>
                    ))}
                  />
                  {program.map((option, i) => (
                    <>
                      {data.PRG_Code !== option.PRG_Code ? (
                        <SelectButtonItem
                          value={option.PRG_Code}
                          content={option.Program}
                        />
                      ) : (
                        ""
                      )}
                    </>
                  ))}
                </>
              }
            />
          </>
        }
        entry={
          <main className="p-3">
            <section>
              <h6>{data.CRS_Code.length > 0 ? data.CRS_Code : "Code"}</h6>
              <h3>{data.Course.length > 0 ? data.Course : "Course"}</h3>
              <hr />
              <ul className="m-0 p-0 d-flex gap-2 mb-3">
                <li className="border m-0 p-2 rounded">
                  <p className="fst-italic text-secondary m-0 p-0">
                    {program.map((prog, i) =>
                      data.PRG_Code === prog.PRG_Code ? prog.Program : null
                    )}
                  </p>
                </li>
              </ul>
            </section>
          </main>
        }
      />
    </form>
  );
}
