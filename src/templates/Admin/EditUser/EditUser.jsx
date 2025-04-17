import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import AdminUserForm from "@/Components/AdminUserForm/AdminUserForm";
import Swal from "sweetalert2";
import { BASE_URL } from "@/url";

export default function EditUser() {
  const [userToEdit, setUserToEdit] = useState(null);

  useEffect(() => {
    const fetchUserToEdit = async () => {
      try {
        const userId = window.location.pathname.split("/").pop();
        const response = await fetch(`${BASE_URL}/users/${userId}`);
        const userData = await response.json();
        setUserToEdit(userData);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de l'utilisateur à éditer :",
          error
        );
      }
    };

    fetchUserToEdit();
  }, []);

  const handleEditUser = async (user) => {
    const token = document.cookie.split(";").find(cookie => cookie.trim().startsWith("token="));
    const loggedUser = JSON.parse(localStorage.getItem("user"));

    if (!token || !loggedUser || loggedUser.role !== "admin") {
      alert("Action interdite : vous devez être un admin connecté.");
      return;
    }

    const tokenValue = token.split("=")[1];

    try {
      const response = await fetch(`${BASE_URL}/users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenValue}`,
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        Swal.fire({
          title: "Modifié!",
          text: "L'utilisateur a été modifié avec succès.",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        }).then(() => {
          window.location.href = "/admin/utilisateurs";
        });
      } else {
        Swal.fire({
          title: "Erreur!",
          text: "Erreur lors de la modification de l'utilisateur.",
          icon: "error",
          timer: 2000,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      console.error("Erreur lors de la modification de l'utilisateur :", error);
      Swal.fire({
        title: "Erreur!",
        text: "Erreur lors de la modification de l'utilisateur.",
        icon: "error",
        timer: 2000,
        timerProgressBar: true,
      });
    }
  };

  return (
    <div className={styles["edit-user"]}>
      <h1>
        ADMINISTRATION -<span> Modifier un utilisateur</span>
      </h1>
      <AdminUserForm
        userToEdit={userToEdit}
        onSubmit={(editedUser) => handleEditUser(editedUser)}
      />
    </div>
  );
}
