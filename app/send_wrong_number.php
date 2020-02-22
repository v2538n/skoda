<?php
	//include_once (  __DIR__ . '/core/core.php');
	$inputtedData = $_POST['inputtedData'];
	$parsingResult = $_POST['parsingResult'];
	$errorDescription = $_POST['errorDescription'];
	$isPossibleNumber = $_POST['isPossibleNumber'];
	$notPossibleReason = $_POST['notPossibleReason'];
	$isValidNumber = $_POST['isValidNumber'];
	$eFormat = $_POST['eFormat'];

	if ($_POST['call_value'] != 'undefined') {$call_value = $_POST['call_value'];} else {$call_value='';}
	$token = 'токен';

	require ('punycode.php');
	$path = explode('?', $_SERVER['HTTP_REFERER']);
	$IDN = new idna_convert();
	$path = $IDN->decode($path[0]);
	
	//$maillist = explode('||',set::allset('email_send'));
	$maillist = array('lp.dis7@tandemadv.ru','aegorov@tandemadv.ru');

	$message = "<table style='border-spacing: 0; border-collapse: collapse;'>";
		$message .= "<tr>";
		$message .= "<td style='border: 1px solid black; padding: 5px; font-weight: bold;'>inputtedData</td>";
		$message .= "<td style='border: 1px solid black; padding: 5px;'>$inputtedData</td>";
		$message .= "</tr>";
		$message .= "<tr>";
		$message .= "<td style='border: 1px solid black; padding: 5px; font-weight: bold;'>parsingResult</td>";
		$message .= "<td style='border: 1px solid black; padding: 5px;'>$parsingResult</td>";
		$message .= "</tr>";
		$message .= "<tr>";
		$message .= "<td style='border: 1px solid black; padding: 5px; font-weight: bold;'>errorDescription</td>";
		$message .= "<td style='border: 1px solid black; padding: 5px;'>$errorDescription</td>";
		$message .= "</tr>";
		$message .= "<tr>";
		$message .= "<td style='border: 1px solid black; padding: 5px; font-weight: bold;'>isPossibleNumber</td>";
		$message .= "<td style='border: 1px solid black; padding: 5px;'>$isPossibleNumber</td>";
		$message .= "</tr>";
		$message .= "<tr>";
		$message .= "<tr>";
		$message .= "<td style='border: 1px solid black; padding: 5px; font-weight: bold;'>notPossibleReason</td>";
		$message .= "<td style='border: 1px solid black; padding: 5px;'>$notPossibleReason</td>";
		$message .= "</tr>";
		$message .= "<tr>";
		$message .= "<td style='border: 1px solid black; padding: 5px; font-weight: bold;'>isValidNumber</td>";
		$message .= "<td style='border: 1px solid black; padding: 5px;'>$isValidNumber</td>";
		$message .= "</tr>";
		$message .= "<tr>";
		$message .= "<td style='border: 1px solid black; padding: 5px; font-weight: bold;'>eFormat</td>";
		$message .= "<td style='border: 1px solid black; padding: 5px;'>$eFormat</td>";
		$message .= "</tr>";
		$message .= "</table>";
		$message .= "<div>";
		$message .= "<h2 style='font-size:20px; font-weight: normal;'>Информация о заявке:</h2>";
		$message .= "<p>Адрес сайта: $path</p>";
		$message .= "<p>Дата отправления: ".date("d.m.Y G:i")."</p>";	
	$message .= "</div>";
	$subject = $_POST['email_title'];
	$subject .= ": НЕВЕРНЫЙ НОМЕР";
	
	//отладчик форм
	if (strpos($phone,'+7000000') !== FALSE) {
		$subject = "Заявка на ".mb_strtoupper($car)." | Техническая проверка формы";
		$maillist = array('whiv@yandex.ru');
		$token = '';
		if ($phone == '+70000000000') $analitic = 0;
	} 	
	

		require ('class.phpmailer.php');

        $mail = new PHPMailer(); 
		$mail->From = 'no-reply@'.$_SERVER['SERVER_NAME'];      // от кого 
		$mail->FromName = '';   // от кого 
		$mail->IsHTML(true);        // выставляем формат письма HTML 
		$mail->Subject = $subject;  // тема письма 
		$mail->Body = $message; 	

		 // отправляем наше письмо 		
		foreach ($maillist as $mails) $mail->AddAddress($mails); 
		if (!$mail->Send()) die ('Mailer Error: '.$mail->ErrorInfo);  
		$mail->ClearAddresses();	
		
		//if ($token != '') {	include_once ('kolltach_order.php'); }

		unset($phone);
		echo json_encode('');

?>