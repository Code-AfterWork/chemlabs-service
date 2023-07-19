This software reads from the log file then sends logs  via email

# Development Steps
## Step 1: Create python function that reads froma  file
     Read and store the contents in a variable
## Step 2: regex to find errors/warning
    Find words i.e warning, error, 
    Filter and get the most recent line containing the string
## Step 3: send warning text via email
    Send the latest matched word via email

Note: Should be a long-running script always sending probes to the log file


Authentication error when I use .env to pass credentials
        # # Email credentials
        # mail_user = os.getenv('MAIL_USER')
        # mail_password =os.getenv ('MAIL_PASSWORD')
        # mail_server = os.getenv ('MAIL_SERVER')