<?php
// send_email.php - Secure contact form mailer for subrata.tech

// Recipient email
$to = "info@subrata.tech";

// Initialize error array
$errors = [];

// Only process POST requests
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Sanitize and validate inputs
    $name    = filter_var(trim($_POST['name'] ?? ''), FILTER_SANITIZE_STRING);
    $email   = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
    $project = filter_var(trim($_POST['project'] ?? ''), FILTER_SANITIZE_STRING);
    $message = filter_var(trim($_POST['message'] ?? ''), FILTER_SANITIZE_STRING);

    // Validation
    if (empty($name)) {
        $errors[] = "Name is required.";
    }
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "A valid email address is required.";
    }
    if (empty($project)) {
        $errors[] = "Project name is required.";
    }
    if (empty($message)) {
        $errors[] = "Message cannot be empty.";
    }

    // Honeypot / bot check (optional, add hidden field in form)
    $honeypot = $_POST['honeypot'] ?? '';
    if (!empty($honeypot)) {
        // Silently ignore bots
        header("Location: index.html?status=success"); 
        exit;
    }

    // If no errors, send email
    if (empty($errors)) {
        $subject = "New Contact Message from $name";

        // Build email body
        $body = "<h2>Contact Request</h2>";
        $body .= "<p><strong>Name:</strong> $name</p>";
        $body .= "<p><strong>Email:</strong> $email</p>";
        $body .= "<p><strong>Project:</strong> $project</p>";
        $body .= "<p><strong>Message:</strong><br>" . nl2br($message) . "</p>";

        // Headers for HTML email
        $headers = "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
        $headers .= "From: $name <$email>\r\n";
        $headers .= "Reply-To: $email\r\n";

        // Send email
        if (mail($to, $subject, $body, $headers)) {
            // Success - redirect with success flag
            header("Location: index.html?status=success#contact");
            exit;
        } else {
            $errors[] = "Email could not be sent. Please try again later.";
        }
    }
}

// If we get here, there were errors
$errorString = implode(" ", $errors);
header("Location: index.html?status=error&message=" . urlencode($errorString) . "#contact");
exit;
?>