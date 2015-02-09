<?php
	
	require 'geekMail-1.0.php';
	
	
	$title = "";
	$fname = "";
	$lname = "";
	$phone = "";
	$email = "";
	$comments = "";
	
	
	$error = "";
	$subject = "";
	
	if (isset($_POST['submitted']) && $_POST['submitted'] == 1)
	{
		$title = check_input($_POST['title']);
		$fname = check_input($_POST['fname'], "first name");
		$lname = check_input($_POST['lname'], "last name");
		$phone = check_input($_POST['phone'], "phone number");
		$email = check_input($_POST['email'], "email address");
		$comments = check_input($_POST['comments']);
		
		$error = ltrim($error, " ,");
		$error = rtrim($error, " ,");
		
		
		// display error for missing input values
		if ($error) 
		{
			$error = "Please enter the following: " . $error . ". ";
		}
		
		
		// validate email address
		if ($email)
		{
			validate_email();
		}
		
		
		
		// send mail!
		if (!$error)
		{
			
			$message = 	'<html style="font-family:\'Verdana\'"> <p style="font-size:18px">Someone would like to get in touch. </p>
						<div style="font-size:14px">
						<b>Name:</b> ' . $title . ' ' . $fname . ' ' . $lname . '<br/>' .
						'<b>Email:</b> ' . $email . '<br/>' .
						'<b>Phone:</b> ' . $phone . '<br/>' .
						'<b>Comments: </b>' . $comments . '<br/>' .
						'</div> </html>';

			
			
			// ensure there is mail to send to applicant
			$issue = TRUE;
			if(!$subject)
			{
				$subject = "Mobile Impact Information Request";
				$issue = FALSE;
			}
			
			
		 
			// send submission to MI
			$submissionEmail = new geekMail();
		 
			$submissionEmail->setMailType('html');
			$submissionEmail->from('info@mobileimpactgroup.com', 'Mobile Impact Info');
			$submissionEmail->to('info@mobileimpactgroup.com');
			$submissionEmail->bcc('jtripp@mobileimpactgroup.com');
			$submissionEmail->subject($subject);
			$submissionEmail->message($message);
			$submissionEmail->send();

			
			// send confirmation to applicant
			if (!$issue)
			{
				$message = '<html style="font-family:\'Verdana\'"> <p>Dear ' . $fname . ', </p>
						<p>Thank you for contacting Mobile Impact!  We have received your inquiry
						and will be in touch soon.</p><br>
						<p>Sincerely,<br/>
						The Mobile Impact Team<br/>
						www.mobileimpactgroup.com</p>' .
						'</html>';
				
				$applicantEmail = new geekMail();
				
				$applicantEmail->setMailType('html');
				$applicantEmail->from('info@mobileimpactgroup.com', 'Mobile Impact');
				$applicantEmail->to($email);
				$applicantEmail->bcc('kelsey_tripp@brown.edu');
				$applicantEmail->subject($subject);
				$applicantEmail->message($message);
				$applicantEmail->send();
			}
			
			// notify javascript
			$error = "submitted";
		}	
		
	}
	
	
	
	function check_input($data, $problem='')
	{
		global $error;
		
		if($data)
		{
			$data = trim($data);
			$data = stripslashes($data);
			$data = htmlspecialchars($data);
		}
		else
		{
			$error = $error . ', ' . $problem;
		}
	
    	return $data;
	}
	
	function validate_email() 
	{
		global $error, $email;
		
		if (!preg_match("/([\w\-]+\@[\w\-]+\.[\w\-]+)/",$email))
		{
			$error = $error . ' Invalid e-mail address. ';
			$email = "";
		}
	}
	
	echo $error;
?>