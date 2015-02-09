$(document).ready(function(){
    
    $('#form_submitted').hide();
    $('#uploading').hide();
    
    $('#fakeupload').attr('value','');
            
    // deal with hidden file upload
    $('#realupload').change(function() {
            $('#fakeupload').attr('value', $('#realupload').attr('value'));
            $('#fakeupload').removeClass('form_error');
            $('em[htmlfor="realupload"]').css('display', 'none');
    });
    

    $.validator.addMethod("phoneUS", function(phone_number, element) {
            var reg = /^\(?[2-9]\d{2}[\)\.-]?\s?\d{3}[\s\.-]?\d{4}$/
            return reg.test(phone_number);
    }, "Invalid phone number. " );
    
    $("#resume_form").validate({
            rules: {
                    fname: { required: true },
                    lname: { required:true },
                    email: {
                            required: true,
                            email: true
                    },
                    phone: {
                            required: true,
                            phoneUS: true
                    },
                    file: {
                            required: true,
                            accept: "pdf|doc|docx"
                    }
            },
            messages: {
                    fname: { required: "Please enter your first name. " },
                    lname: { required: "Please enter your last name. " },
                    email: {
                            required: "Please enter your email address. ",
                            email: "Invalid email address. "
                    },
                    phone: {
                            required: "Please enter your phone number. "
                    },
                    file: {
                            required: "Please choose a file to upload. ",
                            accept: "Invalid file type. "
                    }
            },
            errorLabelContainer: "#error",
            errorElement:"em",
            highlight: function(element, errorClass) {
                    $(element).fadeIn(function() {
                            $(element).addClass('form_error');
                    });
                    if ($(element).attr("id") == "realupload") {
                            $('#fakeupload').addClass('form_error');
                    }
            },
            unhighlight: function(element, errorClass) {
                    $(element).fadeIn(function() {
                            $(element).removeClass('form_error');
                    });
            },
            submitHandler: function(form) {
                    $(form).ajaxSubmit({
                            beforeSubmit: uploading,
                            success:   submitted  // post-submit callback 
                    });
                    return false;
            }
    });
    
    
    function uploading() {
        $('#uploading').show();
        return true;
    }

    function submitted(data) {
            $('#uploading').hide();
            
            if (data == "submitted") {
                    $('#form_submitted').show();
                    $('#form_content').hide();
            }
            else
            {
                    if ((data.toLowerCase().indexOf("file") >= 0)) {
                            $('#fakeupload').addClass('form_error');
                    }
                    $('#error').css("display", "inline");
                    $('#error').html('<em htmlfor="realupload" class="error">' + data + '</em>');
            }
    }
});