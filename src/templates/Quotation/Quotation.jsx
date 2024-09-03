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
    const form = event.currentTarget; // Utilisez event.currentTarget ici
    const formData = new FormData(form);

    const data = {
      companyName: formData.get("companyName"),
      contactName: formData.get("contactName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      services: selectedServices,
      cameraCount: formData.get("cameraCount"),
      areaSize: formData.get("areaSize"),
      existingSystem: formData.get("existingSystem"),
      analysisPurpose: formData.get("analysisPurpose"),
      dataVolume: formData.get("dataVolume"),
      realTimeAnalysis: formData.get("realTimeAnalysis"),
      entryPoints: formData.get("entryPoints"),
      accessMethods: formData.getAll("accessMethods"),
      integration: formData.get("integration"),
      currentStorage: formData.get("currentStorage"),
      networkType: formData.get("networkType"),
      expansion: formData.get("expansion"),
      systemsToMonitor: formData.get("systemsToMonitor"),
      integrationLevel: formData.get("integrationLevel"),
      realTimeMonitoring: formData.get("realTimeMonitoring"),
      projectDetails: formData.get("projectDetails"),
      budget: formData.get("budget"),
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
          title: "Succès",
          text: "Votre demande de devis a bien été envoyée",
          icon: "success",
        });
        form.reset();
        setSelectedServices([]);
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
      <h1>Demandez Votre Devis Personnalisé Gratuit</h1>
      <h3>
        Solutions sur mesure en vidéosurveillance, analyse d'image, contrôle
        d'accès, et plus encore
      </h3>
      <form onSubmit={handleFormSubmit}>
        {/* Informations de Contact */}
        <h2>Informations de Contact</h2>
        <label htmlFor="companyName">Nom de l'entreprise</label>
        <input type="text" id="companyName" name="companyName" required />

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
              value="hypervision"
              checked={isServiceSelected("hypervision")}
              onChange={handleServiceChange}
            />
            Hypervision
          </label>
        </div>

        {/* Questions spécifiques pour Vidéosurveillance */}
        {isServiceSelected("videosurveillance") && (
          <div className={styles.serviceDetails}>
            <h3>Questions sur la Vidéosurveillance</h3>
            <label htmlFor="cameraCount">Nombre de caméras</label>
            <input type="number" id="cameraCount" name="cameraCount" min="0" />

            <label htmlFor="areaSize">Surface à couvrir (en m²)</label>
            <input type="number" id="areaSize" name="areaSize" min="0" />

            <label htmlFor="existingSystem">
              Avez-vous déjà un système existant?
            </label>
            <select id="existingSystem" name="existingSystem">
              <option value="yes">Oui</option>
              <option value="no">Non</option>
            </select>
          </div>
        )}

        {/* Questions spécifiques pour Analyse d'image */}
        {isServiceSelected("analyse_image") && (
          <div className={styles.serviceDetails}>
            <h3>Questions sur l'Analyse d'image</h3>
            <label htmlFor="analysisPurpose">
              Objectif principal de l'analyse
            </label>
            <textarea
              id="analysisPurpose"
              name="analysisPurpose"
              rows="3"
              required
            ></textarea>

            <label htmlFor="dataVolume">
              Volume estimé de données à analyser
            </label>
            <input type="number" id="dataVolume" name="dataVolume" min="0" />

            <label htmlFor="realTimeAnalysis">
              Besoin d'analyse en temps réel?
            </label>
            <select id="realTimeAnalysis" name="realTimeAnalysis">
              <option value="yes">Oui</option>
              <option value="no">Non</option>
            </select>
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
            <select id="accessMethods" name="accessMethods" multiple>
              <option value="badge">Badge</option>
              <option value="biometric">Biométrique</option>
              <option value="keypad">Clavier</option>
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
            <label htmlFor="currentStorage">
              Capacité de stockage actuelle (en To)
            </label>
            <input
              type="number"
              id="currentStorage"
              name="currentStorage"
              min="0"
            />

            <label htmlFor="networkType">Type de réseau</label>
            <select id="networkType" name="networkType">
              <option value="wired">Câblé</option>
              <option value="wireless">Sans fil</option>
            </select>

            <label htmlFor="expansion">
              Prévision de croissance du réseau/stockage?
            </label>
            <select id="expansion" name="expansion">
              <option value="yes">Oui</option>
              <option value="no">Non</option>
            </select>
          </div>
        )}

        {/* Questions spécifiques pour Hypervision */}
        {isServiceSelected("hypervision") && (
          <div className={styles.serviceDetails}>
            <h3>Questions sur l'Hypervision</h3>
            <label htmlFor="systemsToMonitor">
              Nombre de systèmes à surveiller
            </label>
            <input
              type="number"
              id="systemsToMonitor"
              name="systemsToMonitor"
              min="0"
            />

            <label htmlFor="integrationLevel">
              Niveau d'intégration souhaité
            </label>
            <select id="integrationLevel" name="integrationLevel">
              <option value="low">Bas</option>
              <option value="medium">Moyen</option>
              <option value="high">Élevé</option>
            </select>

            <label htmlFor="realTimeMonitoring">
              Surveillance en temps réel nécessaire?
            </label>
            <select id="realTimeMonitoring" name="realTimeMonitoring">
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

        <label htmlFor="budget">Budget estimé</label>
        <input type="number" id="budget" name="budget" min="0" />

        {/* Soumission du formulaire */}
        <button type="submit" className={styles.submitButton}>
            Envoyer
        </button>
        
      </form>
    </div>
  );
}
