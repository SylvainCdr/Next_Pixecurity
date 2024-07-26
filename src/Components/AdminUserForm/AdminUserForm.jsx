import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";

export default function AdminUsers({ onSubmit, userToEdit }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [salesperson, setSalesperson] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [updated, setUpdated] = useState("");

  useEffect(() => {
    if (userToEdit) {
      setFirstName(userToEdit.firstName);
      setLastName(userToEdit.lastName);
      setCompany(userToEdit.company);
      setSalesperson(userToEdit.salesperson);
      setEmail(userToEdit.email);
      setPhone(userToEdit.phone);
      setRole(userToEdit.role);
      setUpdated(userToEdit.updated);
    }
  }, [userToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let user = {
      firstName: firstName,
      lastName: lastName,
      company: company,
      salesperson: salesperson,
      email: email,
      phone: phone,
      role: role,
      updated: updated,
    };

    if (userToEdit && userToEdit._id) {
      user._id = userToEdit._id;
    }

    onSubmit(user);
  };

  return (
    <div className={styles["admin-user-form"]}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">Prénom</label>
        <input
          type="text"
          name="firstname"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label htmlFor="lastName">Nom</label>
        <input
          type="text"
          name="lastname"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <label htmlFor="company">Entreprise</label>
        <input
          type="text"
          name="company"
          id="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <label htmlFor="salesperson">Commercial(e) référent(e)</label>
        <select
          name="salesperson"
          id="salesperson"
          value={salesperson}
          onChange={(e) => setSalesperson(e.target.value)}
        >
          <option value="Aucun">Aucun</option>
          <option value="Kenza GAUTIAM">Kenza GAUTIAM</option>
          <option value="Fabrice VALLEE">Fabrice VALLEE</option>
          <option value="Yanis MEBARKI">Yanis MEBARKI</option>
          <option value="Abdulrhaman SHOUGRI">Abdulrhaman SHOUGRI</option>
        </select>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="phone">Téléphone</label>
        <input
          type="text"
          name="phone"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />


        <label htmlFor="role">Rôle</label>
        <input
          type="text"
          name="role"
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        {/* <label htmlFor="updated">Date de modification</label>
        <input
          type="date"
          name="updated"
          id="updated"
          value={updated}
          onChange={(e) => setUpdated(e.target.value)}
        /> */}

        <button type="submit">Modifier</button>
      </form>
    </div>
  );
}
