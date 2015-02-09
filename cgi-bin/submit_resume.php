<?php

	require 'geekMail-1.0.php';
	
	
	$title = "";
	$fname = "";
	$lname = "";
	$phone = "";
	$email = "";
	$location = "";
	$travel = "";
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
		$location = check_input($_POST['location']);
		$travel = check_input($_POST['travel']);
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
		
		
		// validate file upload
		if ($_FILES["file"]["error"] == UPLOAD_ERR_NO_FILE)
		{
			$error = $error . " Please choose a file to upload. ";
		}
		else
		{
			// check uploaded doc for correct filetype and size
			if ((($_FILES["file"]["type"] == "application/pdf")
			     || ($_FILES["file"]["type"] == "application/msword")
			     || ($_FILES["file"]["type"] == "application/vnd.openxmlformats-officedocument.wordprocessingml.document"))
			     && ($_FILES["file"]["size"] < 1024000))
			{
				if ($_FILES["file"]["error"] > 0)
				{
					$error .= " Problem uploading file. Please try again. ";
				}
			}
			else
			{
				// display error messages
				if ($_FILES["file"]["error"] == UPLOAD_ERR_INI_SIZE || $_FILES["file"]["size"] >= 1024000)
				{
					$error = $error . " File size must be less than 1MB. ";
				}
				else
				{
					$error = $error . " Invalid file type. ";
				}
			}
		}
		
		
		// send mail!
		if (!$error)
		{
			
			$message = 	'<html style="font-family:\'Verdana\'"> <p style="font-size:18px">New resume submission! </p>
						<div style="font-size:14px">
						<b>Name:</b> ' . $title . ' ' . $fname . ' ' . $lname . '<br/>' .
						'<b>Email:</b> ' . $email . '<br/>' .
						'<b>Phone:</b> ' . $phone . '<br/>' .
						'<b>Desired Location: </b>' . $location . '<br/>' .
						'<b>Willing to Travel: </b>' . $travel . '<br/>' .
						'<b>Comments: </b>' . $comments . '<br/>' .
						'<p>See attached resume.</p>' .
						'</div> </html>';

			
			
			// ensure there is mail to send to applicant
			$issue = TRUE;
			if(!$subject)
			{
				$subject = "Mobile Impact Resume Submission";
				$issue = FALSE;
			}
			
			
		 
			// send submission to MI
			$submissionEmail = new geekMail();
			
			$submissionEmail->setMailType('html');
			$submissionEmail->from('resume@mobileimpactgroup.com', 'Mobile Impact Resumes');
			$submissionEmail->to('resume@mobileimpactgroup.com');
			$submissionEmail->bcc('jtripp@mobileimpactgroup.com');
			$submissionEmail->subject($subject);
			$submissionEmail->message($message);
			$submissionEmail->attach($_FILES["file"]["tmp_name"], 'attachment', $_FILES['file']['name']);
			$submissionEmail->send();
			
			
			// send confirmation to applicant
			if (!$issue)
			{
				$message = '<html style="font-family:\'Verdana\'"> <p>Dear ' . $fname . ', </p>
						<p>Thank you for your interest in Mobile Impact.  We have received your resume
						submission and will review it shortly.  If your qualifications match our needs,
						we will be in touch to discuss possible positions. </p>
						<p>Sincerely,<br>
						The Mobile Impact Team<br/>
						www.mobileimpactgroup.com</p>' .
						'</html>';
				
				$applicantEmail = new geekMail();
				
				$applicantEmail->setMailType('html');
				$applicantEmail->from('resume@mobileimpactgroup.com', 'Mobile Impact');
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
