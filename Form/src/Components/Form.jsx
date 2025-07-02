import React, { Fragment, useState } from "react";

import "./Form.css";

function Form() {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [contact, setcontact] = useState("");
  const [gender, setgender] = useState("");
  const [subject, setSubjects] = useState({
    english: true,
    maths: false,
    science: false,
  });
  const [resume, setresume] = useState(null);
  const [url, setUrl] = useState("");
  const [selected, setSelect] = useState("");
  const [textarea, settextarea] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      firstName,
      lastName,
      email,
      contact,
      gender,
      subject,
      resume,
      url,
      selected,
      textarea,
    };
    console.log("formData :", formData);
  };
  const handleReset = () => {
    setfirstName("");
    setlastName("");
    setemail("");
    setcontact("");
    setgender("");
    setSubjects({
      english: false,
      maths: false,
      science: false,
    });
    setresume(null);
    setUrl("");
    setSelect("");
    settextarea("");
  };
  return (
    <Fragment>
      <div className="App">
        <h1>Simple Form with ReactJS</h1>
        <fieldset>
          <form onSubmit={handleSubmit}>
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              value={firstName}
              onChange={(e) => setfirstName(e.target.value)}
              placeholder="Enter your First name"
              required
            />
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
              placeholder="Enter your Last name"
              required
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              placeholder="Enter your Email"
              required
            />
            <label htmlFor="contact">Contact</label>
            <input
              type="tel"
              name="contact"
              id="contact"
              value={contact}
              onChange={(e) => setcontact(e.target.value)}
              placeholder="Enter your Contact No"
              required
            />
            <label htmlFor="gender">Gender</label>
            <input
              type="radio"
              name="gender"
              id="male"
              value="male"
              checked={gender === "male"}
              onChange={(e) => setgender(e.target.value)}
              required
            />
            Male
            <input
              type="radio"
              name="gender"
              id="female"
              value="female"
              checked={gender === "female"}
              onChange={(e) => setgender(e.target.value)}
              required
            />
            Female
            <input
              type="radio"
              name="gender"
              id="others"
              value="others"
              checked={gender === "others"}
              onChange={(e) => setgender(e.target.value)}
              required
            />
            Others
            <label htmlFor="subject">Choose your Subject</label>
            <input
              type="checkbox"
              name="subject"
              id="english"
              checked={subject.english}
              onChange={(e) =>
                setSubjects({ ...subject, english: e.target.checked })
              }
            />
            English
            <input
              type="checkbox"
              name="subject"
              id="Maths"
              checked={subject.maths}
              onChange={(e) =>
                setSubjects({ ...subject, maths: e.target.checked })
              }
            />
            Maths
            <input
              type="checkbox"
              name="subject"
              id="science"
              checked={subject.science}
              onChange={(e) =>
                setSubjects({ ...subject, science: e.target.checked })
              }
            />
            Science
            <label htmlFor="fileUpload">Upload resume</label>
            <input
              type="file"
              name="file"
              id="file"
              onChange={(e) => setresume(e.target.files[0])}
              required
            />
            <label htmlFor="url">Enter URL</label>
            <input
              type="url"
              name="url"
              id="url"
              onChange={(e) => setUrl(e.target.value)}
            />
            <label htmlFor="selection">Select your Choice</label>
            <select
              name="select"
              id="select"
              value={selected}
              onChange={(e) => setSelect(e.target.value)}
            >
              <option value="" disabled>
                Select your Answer
              </option>
              <optgroup label="Beginners">
                <option value="1">HTML</option>
                <option value="2">CSS</option>
                <option value="3">JavaScript</option>
              </optgroup>
              <optgroup label="Advanced">
                <option value="4">React</option>
                <option value="5">Node</option>
                <option value="6">Express</option>
                <option value="7">MongoDB</option>
              </optgroup>
            </select>
            <label htmlFor="textarea">About </label>
            <textarea
              name="about"
              id="textarea"
              col="30"
              row="10"
              value={textarea}
              onChange={(e) => {
                settextarea(e.target.value);
              }}
              placeholder="Write Here...."
            />
            <button type="button" value="reset" onClick={handleReset}>
              Reset
            </button>
            <button type="submit" value="submit">
              Submit
            </button>
          </form>
        </fieldset>
      </div>
    </Fragment>
  );
}

export default Form;
