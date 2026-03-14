<?php
header('Content-Type: application/json');

// Get the POST data
$json = file_get_contents('php://input');
$data = json_decode($json);

if (!isset($data->id_token)) {
    echo json_encode(['success' => false, 'error' => 'No token provided']);
    exit;
}

$id_token = $data->id_token;

// Verify the token with Google's API
// For a production app, it's better to use the Google API PHP Client library,
// but for this learning project, we can use the tokeninfo endpoint.
$url = "https://oauth2.googleapis.com/tokeninfo?id_token=" . $id_token;

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($http_code === 200) {
    $user_data = json_decode($response);
    
    // Start a session to keep the user logged in
    session_start();
    $_SESSION['user'] = [
        'id' => $user_data->sub,
        'email' => $user_data->email,
        'name' => $user_data->name,
        'picture' => $user_data->picture
    ];

    echo json_encode([
        'success' => true,
        'user' => $_SESSION['user']
    ]);
} else {
    echo json_encode([
        'success' => false,
        'error' => 'Invalid token'
    ]);
}
?>
