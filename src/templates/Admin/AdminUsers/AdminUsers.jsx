import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import Link from "next/link";
import AdminUserForm from "@/Components/AdminUserForm/AdminUserForm";
import Swal from "sweetalert2";
import { BASE_URL } from "@/url";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Vérification du rôle admin + token au montage du composant
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = document.cookie.split(";").find(cookie => cookie.trim().startsWith("token="));

    if (user && user.role === "admin" && token) {
      setIsAdmin(true);
    } else {
      alert("Accès interdit : Vous devez être admin et connecté.");
      window.location.href = "/"; // Rediriger vers la page d'accueil
    }
  }, []);

  // Chargement des utilisateurs une fois la vérification admin faite
  useEffect(() => {
    if (!isAdmin) return;

    const token = document.cookie
      .split(";")
      .find(cookie => cookie.trim().startsWith("token="))
      ?.split("=")[1];

    fetch(`${BASE_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setUsers(data.reverse()))
      .catch((error) => console.error("Erreur lors de la récupération des utilisateurs :", error));
  }, [isAdmin]);

  const deleteUser = (id) => {
    if (!id) {
      console.error("ID is undefined or null");
      return;
    }
  
    const token = document.cookie.split(";").find(cookie => cookie.trim().startsWith("token="));
    const user = JSON.parse(localStorage.getItem("user"));
  
    if (!token || !user || user.role !== "admin") {
      alert("Action interdite : vous devez être un admin connecté.");
      return;
    }
  
    const tokenValue = token.split("=")[1];
  
    Swal.fire({
      title: "Êtes-vous sûr?",
      text: "Vous ne pourrez pas récupérer cet utilisateur!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Annuler",
      confirmButtonText: "Oui",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${BASE_URL}/users/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${tokenValue}`,
          },
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error("Erreur lors de la suppression");
            }
            setUsers((prevUsers) =>
              prevUsers.filter((user) => user._id !== id)
            );
          })
          .then(() => {
            Swal.fire({
              title: "Supprimé!",
              text: "L'utilisateur a été supprimé avec succès.",
              icon: "success",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
            });
          })
          .catch((error) =>
            console.error("Erreur lors de la suppression de l'utilisateur :", error)
          );
      }
    });
  };
  

  return (
    <div className={styles["admin-users"]}>
      <h1>
        ADMINISTRATION -<span> Utilisateurs </span>
      </h1>

      {selectedUser ? (
        <AdminUserForm
          userToEdit={selectedUser}
          onSubmit={() => {
            setSelectedUser(null);
          }}
        />
      ) : (
        <table>
          <thead>
            <tr>
              <th>Prénom</th>
              <th>Nom</th>
              <th>Entreprise</th>
              <th>Email</th>
              <th>
                Rôle <br />
                (user / admin)
              </th>

              <th>
                Création <br />
                compte
              </th>
              <th>
                Modification <br />
                compte
              </th>
              <th>Actions</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.company}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>

                <td>{new Date(user.created).toLocaleDateString()}</td>
                {/* // Ajout de la date de modification si elle est différente de la date de création, sinon on affiche un tiret */}
                <td>
                  {user.updated !== user.created
                    ? new Date(user.updated).toLocaleDateString()
                    : "-"}
                </td>
                <td>
                  <Link href={`/admin/utilisateurs/modification/${user._id}`}>
                    <button className={styles["modify-btn"]}>Modifier</button>
                  </Link>
                </td>
                <td>
                  <button
                    className={styles["delete-btn"]}
                    onClick={() => deleteUser(user._id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
