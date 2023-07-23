# # This program will continuously search for the latest matching line in the specified file and send the results via email.
# # It will print the search results to the console and wait for 60 seconds before the next search.
# # You can adjust the sleep time to match your requirements.


import time
import requests

def find_latest_matching_line(filename, prev_latest_line):
    # Open the text file for reading
    with open(filename, 'r') as f:
        
        facility = 'Aga Khan Hospital'

        # Define the strings to search for
        search_strings = ['warning', 'error', 'critical']
        
        # Initialize a dictionary to store the matching lines
        matching_lines = {search_string: None for search_string in search_strings}
        
        # Loop through each line of the file
        for line in f:
            
            # Check if the line contains any of the search strings
            for search_string in search_strings:
                if search_string in line:
                    matching_lines[search_string] = line.strip()
        
        # Get the latest matching line
        latest_line = None
        for search_string, matching_line in matching_lines.items():
            if matching_line is not None:
                if latest_line is None or matching_line > latest_line:
                    latest_line = matching_line
        
        # Send the result via API if the latest line has changed
        if latest_line is not None and latest_line != prev_latest_line:
            api_url = 'http://127.0.0.1:8000/client/errors/'  # Replace with the actual API endpoint URL
            payload = {
                'facility': facility,
                'error': latest_line
            }
            try:
                response = requests.post(api_url, json=payload)
                if response.status_code == 200:
                    print(f"Data sent to API: {payload}")
                else:
                    print(f"Failed to send data to the API. Status code: {response.status_code}")
            except Exception as ex:
                print(f"Something went wrong….{ex}")
        else:
            print("No new data to send.")
        return latest_line

def main():
    filename = './monitor.log'
    prev_latest_line = None
    while True:
        print("Searching for new data...")
        prev_latest_line = find_latest_matching_line(filename, prev_latest_line)
        time.sleep(60)  # wait for 60 seconds before the next search

if __name__ == '__main__':
    main()



# import time
# import smtplib
# from email.mime.text import MIMEText

# import os



# def find_latest_matching_line(filename, email_to, prev_latest_line):
#     # Open the text file for reading
#     with open(filename, 'r') as f:
        
#         # Email credentials
#         mail_user = 'wiki@chem-labs.com'
#         mail_password = 'PORT23closed.#'

#         facility = 'Coptic Mission'

#         # Define the strings to search for
#         search_strings = ['warning', 'error', 'critical']
        
#         # Initialize a dictionary to store the matching lines
#         matching_lines = {search_string: None for search_string in search_strings}
        
#         # Loop through each line of the file
#         for line in f:
            
#             # Check if the line contains any of the search strings
#             for search_string in search_strings:
#                 if search_string in line:
#                     matching_lines[search_string] = line.strip()
        
#         # Get the latest matching line
#         latest_line = None
#         for search_string, matching_line in matching_lines.items():
#             if matching_line is not None:
#                 if latest_line is None or matching_line > latest_line:
#                     latest_line = matching_line
        
#         # Send the result via email if latest line has changed
#         if latest_line is not None and latest_line != prev_latest_line:
#             result = f"{facility} Latest line with any of the search strings: {latest_line}"
#             msg = MIMEText(result)
#             msg['To'] = email_to
#             msg['Subject'] = "Log" + facility
#             try:
#                 smtp_server = smtplib.SMTP_SSL('mail.chem-labs.com', 465)
#                 smtp_server.ehlo()
#                 smtp_server.login(mail_user, mail_password)
#                 smtp_server.sendmail('wiki@chem-labs.com', email_to, msg.as_string())
#                 smtp_server.close()
#                 result = f"{result}\n\nSearch results sent to {email_to}"
#             except Exception as ex:
#                 result = f"Something went wrong….{ex}"
#             return result, latest_line
#         else:
#             return "", prev_latest_line

# def main():
#     filename = './monitor.log'
#     email_to = 'it@chem-labs.com'
#     prev_latest_line = None
#     while True:
#         print(f"Sending email to: {email_to}")
#         result, prev_latest_line = find_latest_matching_line(filename, email_to, prev_latest_line)
#         if result:
#             print(result)
#         time.sleep(60)  # wait for 60 seconds before the next search

# if __name__ == '__main__':
#     main()