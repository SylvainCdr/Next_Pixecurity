import React, { useState } from "react";
import styles from "./style.module.scss";
import Swal from "sweetalert2"; // Assurez-vous d'avoir cette dépendance installée
import { BASE_URL } from "../../url";

export default function Quotation() {
  const [selectedServices, setSelectedServices] = useState([]);

  const handleServiceChange = (event) => {
    const value = event.target.value;
    setSelectedServices((prev) =>
      prev.includes(value)
        ? prev.filter((service) => service !== value)
        : [...prev, value]
    );
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const data = {
      companyName: formData.get("companyName"),
      contactName: formData.get("contactName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      services: selectedServices,
      cameraCount: formData.get("cameraCount"),
      solution: formData.get("solution"),
      existingVideoSystem: formData.get("existingVideoSystem"),
      existingVideoSystemDetails: formData.get("existingVideoSystemDetails"),
      typeAnalysis: formData.get("typeAnalysis"),
      analysisPurpose: formData.get("analysisPurpose"),
      entryPoints: formData.get("entryPoints"),
      accessMethods: formData.getAll("accessMethods"),
      securityLevel: formData.get("securityLevel"),
      integration: formData.get("integration"),
      existingNetworkSystem: formData.get("existingNetworkSystem"),
      currentStorage: formData.get("currentStorage"),
      expansion: formData.get("expansion"),
      systemsToMonitor: formData.get("systemsToMonitor"),
      vmsNeeded: formData.get("vmsNeeded"),
      projectDetails: formData.get("projectDetails"),
    };

    try {
      const response = await fetch(`${BASE_URL}/quotation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        Swal.fire({
          title: "Demande de devis envoyée",
          text: "Vous allez être contacté sous peu pour discuter de votre projet",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed || result.isDismissed) {
            // Rediriger l'utilisateur vers la page d'accueil après la confirmation ou la fermeture de l'alerte
            window.location.assign("/");
          }
        });
      } else {
        Swal.fire({
          title: "Erreur",
          text: "Une erreur s'est produite, veuillez réessayer",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Erreur",
        text: "Une erreur s'est produite, veuillez réessayer",
        icon: "error",
      });
    }
  };

  const isServiceSelected = (service) => selectedServices.includes(service);

  return (
    <div className={styles.quotationContainer}>
      <h1>Demandez Votre Devis Gratuit et Personnalisé</h1>
      <h3>
        Des Solutions Personnalisées pour la Vidéosurveillance, l'Analyse
        d'Images, le Contrôle d'Accès, et Plus Encore
      </h3>
      <form onSubmit={handleFormSubmit}>
        {/* Informations de Contact */}
        <h2>Informations de Contact</h2>
        <label htmlFor="companyName">Nom de l'entreprise</label>
        <input type="text" id="Nom Entreprise" name="companyName" required />

        <label htmlFor="contactName">Nom du contact</label>
        <input type="text" id="contactName" name="contactName" required />

        <label htmlFor="email">Adresse e-mail</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="phone">Numéro de téléphone</label>
        <input type="tel" id="phone" name="phone" />

        {/* Sélection des Services */}
        <h2>Services Demandés</h2>
        <label>Sélectionnez les services dont vous avez besoin</label>
        <div className={styles.checkboxContainer}>
          <label>
            <input
              type="checkbox"
              value="videosurveillance"
              checked={isServiceSelected("videosurveillance")}
              onChange={handleServiceChange}
            />
            Vidéosurveillance
          </label>
          <label>
            <input
              type="checkbox"
              value="analyse_image"
              checked={isServiceSelected("analyse_image")}
              onChange={handleServiceChange}
            />
            Analyse d'image
          </label>
          <label>
            <input
              type="checkbox"
              value="controle_acces"
              checked={isServiceSelected("controle_acces")}
              onChange={handleServiceChange}
            />
            Contrôle d'accès
          </label>
          <label>
            <input
              type="checkbox"
              value="reseaux_stockage"
              checked={isServiceSelected("reseaux_stockage")}
              onChange={handleServiceChange}
            />
            Réseaux/Stockage des données
          </label>
          <label>
            <input
              type="checkbox"
              value="supervision"
              checked={isServiceSelected("supervision")}
              onChange={handleServiceChange}
            />
            Supervision
          </label>
        </div>

        {/* Questions spécifiques pour Vidéosurveillance */}
        {isServiceSelected("videosurveillance") && (
          <div className={styles.serviceDetails}>
            <h3>Questions sur la Vidéosurveillance</h3>
            <label htmlFor="cameraCount">Nombre de caméras</label>
            <input type="number" id="cameraCount" name="cameraCount" min="0" />

            <label htmlFor="solution">Type de solution souhaitée</label>
            <select id="solution" name="solution">
              <option value="nvr">Sur Enregistreur (NVR)</option>
              <option value="software">Sur Logiciel</option>
            </select>

            <label htmlFor="existingVideoSystem">
              Avez-vous déjà un système existant?
            </label>
            <select id="existingVideoSystem" name="existingVideoSystem">
              <option value="yes">Oui</option>
              <option value="no">Non</option>
            </select>

            <label htmlFor="existingVideoSystemDetails">Si oui, lequel ?</label>
            <input
              type="text"
              id="existingVideoSystemDetails"
              name="existingVideoSystemDetails"
            />
          </div>
        )}

        {/* Questions spécifiques pour Analyse d'image */}
        {isServiceSelected("analyse_image") && (
          <div className={styles.serviceDetails}>
            <h3>Questions sur l'Analyse d'image</h3>
            <label htmlFor="typeAnalysis">Type d'analyse</label>
            <select id="typeAnalysis" name="typeAnalysis">
              <option value="live">En temps réel</option>
              <option value="reading">En relecture</option>
            </select>
            <label htmlFor="analysisPurpose">
              Objectif principal de l'analyse
            </label>
            <textarea
              id="analysisPurpose"
              name="analysisPurpose"
              rows="3"
              required
            ></textarea>
          </div>
        )}

        {/* Questions spécifiques pour Contrôle d'accès */}
        {isServiceSelected("controle_acces") && (
          <div className={styles.serviceDetails}>
            <h3>Questions sur le Contrôle d'accès</h3>
            <label htmlFor="entryPoints">Nombre de points d'accès</label>
            <input type="number" id="entryPoints" name="entryPoints" min="0" />

            <label htmlFor="accessMethods">
              Méthodes de contrôle d'accès souhaitées
            </label>
            <div className={styles.checkboxContainer}>
              <label>
                <input type="checkbox" value="badge" name="accessMethods" />
                Badge
              </label>
              <label>
                <input type="checkbox" value="biometric" name="accessMethods" />
                Biométrique
              </label>
              <label>
                <input type="checkbox" value="keyboard" name="accessMethods" />
                Clavier
              </label>
            </div>

            <label htmlFor="securityLevel">Niveau de sécurité souhaité</label>
            <select id="securityLevel" name="securityLevel">
              <option value="low">Bas</option>
              <option value="medium">Moyen</option>
              <option value="high">Élevé</option>
            </select>

            <label htmlFor="integration">
              Intégration avec d'autres systèmes?
            </label>
            <select id="integration" name="integration">
              <option value="yes">Oui</option>
              <option value="no">Non</option>
            </select>
          </div>
        )}

        {/* Questions spécifiques pour Réseaux/Stockage des données */}
        {isServiceSelected("reseaux_stockage") && (
          <div className={styles.serviceDetails}>
            <h3>Questions sur les Réseaux/Stockage des données</h3>

            <label htmlFor="existingNetworkSystem">
              Avez-vous déjà un système existant?
            </label>
            <select id="existingNetworkSystem" name="existingNetworkSystem">
              <option value="yes">Oui</option>
              <option value="no">Non</option>
            </select>

            <label htmlFor="currentStorage">
              Si oui, quelle est la capacité de stockage actuelle ?
            </label>
            <input type="text" id="currentStorage" name="currentStorage" />

            <label htmlFor="expansion">
              Prévision de croissance du réseau/stockage?
            </label>
            <select id="expansion" name="expansion">
              <option value="yes">Oui</option>
              <option value="no">Non</option>
            </select>
          </div>
        )}

        {/* Questions spécifiques pour Supervision */}
        {isServiceSelected("supervision") && (
          <div className={styles.serviceDetails}>
            <h3>Questions sur la Supervision</h3>
            <label htmlFor="systemsToMonitor">
              Nombre de systèmes à surveiller
            </label>
            <input
              type="number"
              id="systemsToMonitor"
              name="systemsToMonitor"
              min="0"
            />

            <label htmlFor="vmsNeeded">Avez-vous besoin d'un VMS ?</label>
            <select id="vmsNeeded" name="vmsNeeded">
              <option value="yes">Oui</option>
              <option value="no">Non</option>
            </select>
          </div>
        )}

        {/* Détails du Projet */}
        <h2>Détails du Projet</h2>
        <label htmlFor="projectDetails">Décrivez votre projet</label>
        <textarea
          id="projectDetails"
          name="projectDetails"
          rows="5"
          required
        ></textarea>

        {/* Soumission du formulaire */}
        <button type="submit" className={styles.submitButton}>
          Envoyer
        </button>
      </form>
    </div>
  );
}
