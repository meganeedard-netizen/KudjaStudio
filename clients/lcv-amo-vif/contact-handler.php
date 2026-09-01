<?php
/**
 * Traitement du formulaire de contact — La Clef de Voûte
 * Envoie un email à contact@lcv-amo.fr via la fonction mail() de l'hébergeur (Hostinger).
 */

header('Content-Type: application/json; charset=utf-8');

$destinataire = 'contact@lcv-amo.fr';

function repondre($ok, $message) {
    echo json_encode(['ok' => $ok, 'message' => $message]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    repondre(false, 'Méthode non autorisée.');
}

// Piège à robots : si rempli, on répond succès sans envoyer
if (!empty($_POST['site_web'])) {
    repondre(true, 'Merci.');
}

$nom       = trim($_POST['nom'] ?? '');
$structure = trim($_POST['structure'] ?? '');
$email     = trim($_POST['email'] ?? '');
$telephone = trim($_POST['telephone'] ?? '');
$typeProjet = trim($_POST['type_projet'] ?? '');
$message   = trim($_POST['message'] ?? '');

if ($nom === '' || $email === '' || $message === '') {
    http_response_code(422);
    repondre(false, 'Merci de renseigner les champs obligatoires.');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    repondre(false, 'Adresse email invalide.');
}

$sujet = 'Nouveau message depuis lcv-amo.fr — ' . $nom;

$corps = "Nouvelle demande de contact reçue sur lcv-amo.fr\n\n";
$corps .= "Nom : {$nom}\n";
$corps .= "Commune / structure : {$structure}\n";
$corps .= "Email : {$email}\n";
$corps .= "Téléphone : {$telephone}\n";
$corps .= "Type de projet : {$typeProjet}\n\n";
$corps .= "Message :\n{$message}\n";

$headers   = [];
$headers[] = 'From: Site La Clef de Voûte <no-reply@lcv-amo.fr>';
$headers[] = 'Reply-To: ' . $nom . ' <' . $email . '>';
$headers[] = 'Content-Type: text/plain; charset=UTF-8';

$envoye = mail($destinataire, '=?UTF-8?B?' . base64_encode($sujet) . '?=', $corps, implode("\r\n", $headers));

if ($envoye) {
    repondre(true, 'Message envoyé.');
} else {
    http_response_code(500);
    repondre(false, "Erreur lors de l'envoi.");
}
