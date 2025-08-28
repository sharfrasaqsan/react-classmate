import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { timestamp } from "../../firebase/Config";
import { auth } from "../../firebase/Config";
import { db } from "../../firebase/Config";
import { setDoc, doc } from "firebase/firestore";
import { useData } from "../../contexts/DataContext";
import { useAuth } from "../../contexts/AuthContext";

const CreateStudent = () => {
  const { user } = useAuth();
  const { setStudents, navigate } = useData();

  const [studentRegNo, setStudentRegNo] = useState("");
  const [firstname, setFirstname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [photo, setPhoto] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [fatherPhone, setFatherPhone] = useState("");
  const [grade, setGrade] = useState("");
  const [emergencyName, setEmergencyName] = useState(fatherName);
  const [emergencyPhone, setEmergencyPhone] = useState(fatherPhone);
  const [admissionDate, setAdmissionDate] = useState("");

  const [createLoading, setCreateLoading] = useState(false);

  useEffect(() => {
    setEmergencyName(fatherName);
    setEmergencyPhone(fatherPhone);
  }, [fatherName, fatherPhone]);

  const handleCreate = async () => {
    try {
      setCreateLoading(true);
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { uid } = userCredentials.user;
      const newStudent = {
        id: uid,
        studentRegNo,
        firstname,
        middlename,
        lastname,
        email,
        gender,
        dateOfBirth,
        address,
        phone,
        photo,
        fatherName,
        fatherPhone,
        grade,
        emergencyName,
        emergencyPhone,
        role: "student",
        status: "active",
        createdAt: timestamp(),
      };
      await setDoc(doc(db, "students", uid), newStudent);
      setStudents((prev) => [...prev, newStudent]);
      navigate("/student-dashboard");
    } catch (err) {
      console.log(
        "Error creating student: ",
        err,
        "Error message: ",
        err.message
      );
      setCreateLoading(false);
    } finally {
      setCreateLoading(false);
    }
  };

  return (
    <section>
      <h2>Create Student</h2>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCreate();
          }}
        >
          <div>
            <label htmlFor="photo">
              <img
                src={photo}
                alt={firstname}
                width="100px"
                height="100px"
                style={{
                  borderRadius: "50%",
                  objectFit: "cover",
                  cursor: "pointer",
                }}
                title={firstname}
                loading="lazy"
              />
              <input
                type="file"
                name="photo"
                id="photo"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                required
                style={{ display: "none" }}
              />
            </label>
          </div>

          <div>
            <label htmlFor="studentRegNo">Registration Number</label>
            <input
              type="text"
              name="studentRegNo"
              id="studentRegNo"
              placeholder="Enter student registration number"
              value={studentRegNo}
              onChange={(e) => setStudentRegNo(e.target.value)}
              autoComplete="off"
              autoFocus
              required
            />
          </div>

          <div>
            <label htmlFor="firstname">First Name *</label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Enter first name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              autoComplete="off"
              required
            />
          </div>

          <div>
            <label htmlFor="middlename">Middle Name</label>
            <input
              type="text"
              name="middlename"
              id="middlename"
              placeholder="Enter middle name"
              value={middlename}
              onChange={(e) => setMiddlename(e.target.value)}
              autoComplete="off"
            />
          </div>

          <div>
            <label htmlFor="lastname">Last Name *</label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              placeholder="Enter last name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              autoComplete="off"
              required
            />
          </div>

          <div>
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              required
            />
          </div>

          <div>
            <label htmlFor="password">Password *</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
              required
            />
          </div>

          <div>
            <label htmlFor="gender">Gender *</label>
            <div>
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={(e) => setGender(e.target.value)}
                required
              />
              <label htmlFor="male">Male</label>
            </div>
            <div>
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                checked={gender === "female"}
                onChange={(e) => setGender(e.target.value)}
              />
              <label htmlFor="female">Female</label>
            </div>
            <div>
              <input
                type="radio"
                id="other"
                name="gender"
                value="other"
                checked={gender === "other"}
                onChange={(e) => setGender(e.target.value)}
              />
              <label htmlFor="other">Other</label>
            </div>
          </div>

          <div>
            <label htmlFor="dateOfBirth">Date of Birth *</label>
            <input
              type="date"
              name="dateOfBirth"
              id="dateOfBirth"
              placeholder="Enter date of birth"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              autoComplete="off"
              required
            />
          </div>

          <div>
            <label htmlFor="address">Address *</label>
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              autoComplete="off"
              required
            />
          </div>

          <div>
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="off"
            />
          </div>

          <div>
            <label htmlFor="fatherName">Father Name *</label>
            <input
              type="text"
              name="fatherName"
              id="fatherName"
              placeholder="Enter father name"
              value={fatherName}
              onChange={(e) => setFatherName(e.target.value)}
              autoComplete="off"
              required
            />
          </div>

          <div>
            <label htmlFor="fatherphone">Father Phone Number *</label>
            <input
              type="text"
              name="fatherPhone"
              id="fatherPhone"
              placeholder="Enter father phone number"
              value={fatherPhone}
              onChange={(e) => setFatherPhone(e.target.value)}
              autoComplete="off"
              required
            />
          </div>

          <div>
            <label htmlFor="grade">Grade *</label>
            <input
              type="text"
              name="grade"
              id="grade"
              placeholder="Enter grade"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              autoComplete="off"
              required
            />
          </div>

          <div>
            <label htmlFor="emergencyname">Emergency Person Name *</label>
            <input
              type="text"
              name="emergencyName"
              id="emergencyName"
              placeholder="Enter emergency person name"
              value={emergencyName}
              onChange={(e) => setEmergencyName(e.target.value)}
              autoComplete="off"
              required
            />
          </div>

          <div>
            <label htmlFor="emergencyphone">
              Emergency Person Phone Number *
            </label>
            <input
              type="text"
              name="emergencyphone"
              id="emergencyphone"
              placeholder="Enter emergency person phone number"
              value={emergencyPhone}
              onChange={(e) => setEmergencyPhone(e.target.value)}
              autoComplete="off"
              required
            />
          </div>

          <div>
            <label htmlFor="admissiondate">Admission Date *</label>
            <input
              type="date"
              name="admissiondate"
              id="admissiondate"
              placeholder="Enter admission date"
              value={admissionDate}
              onChange={(e) => setAdmissionDate(e.target.value)}
              autoComplete="off"
              required
            />
          </div>

          <button type="submit">
            {createLoading ? "Creating..." : "Create Student Profile"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateStudent;
