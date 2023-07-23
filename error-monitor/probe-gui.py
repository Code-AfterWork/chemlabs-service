import time
import smtplib
from email.mime.text import MIMEText
import os
import tkinter as tk


def find_latest_matching_line(filename, email_to, prev_latest_line, mail_user, mail_password):
    # Open the text file for reading
    with open(filename, 'r') as f:
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
        
        # Send the result via email if latest line has changed
        if latest_line is not None and latest_line != prev_latest_line:
            result = f"Latest line with any of the search strings: {latest_line}"
            msg = MIMEText(result)
            msg['To'] = email_to
            msg['Subject'] = "Log File Search Results"
            try:
                smtp_server = smtplib.SMTP_SSL('mail.chem-labs.com', 465)
                smtp_server.ehlo()
                smtp_server.login(mail_user, mail_password)
                smtp_server.sendmail('wiki@chem-labs.com', email_to, msg.as_string())
                smtp_server.close()
                result = f"{result}\n\nSearch results sent to {email_to}"
            except Exception as ex:
                result = f"Something went wrong….{ex}"
            return result, latest_line
        else:
            return "", prev_latest_line


def main(filename, email_to, mail_user, mail_password):
    prev_latest_line = None
    while True:
        result, prev_latest_line = find_latest_matching_line(filename, email_to, prev_latest_line, mail_user, mail_password)
        if result:
            print(result)
        time.sleep(60)  # wait for 60 seconds before the next search


def run_program():
    filename = filename_entry.get()
    email_to = email_to_entry.get()
    mail_user = mail_user_entry.get()
    mail_password = mail_password_entry.get()
    main(filename, email_to, mail_user, mail_password)


# Create the GUI
root = tk.Tk()
root.title("Log File Search")

# Create labels and entry boxes for each variable
filename_label = tk.Label(root, text="Log file path:")
filename_entry = tk.Entry(root)
filename_label.pack()
filename_entry.pack()

email_to_label = tk.Label(root, text="Email to:")
email_to_entry = tk.Entry(root)
email_to_label.pack()
email_to_entry.pack()

mail_user_label = tk.Label(root, text="Email username:")
mail_user_entry = tk.Entry(root)
mail_user_label.pack()
mail_user_entry.pack()

mail_password_label = tk.Label(root, text="Email password:")
mail_password_entry = tk.Entry(root, show="*")
mail_password_label.pack()
mail_password_entry.pack()

# Create a button to run the program
run_button = tk.Button(root, text="Run Program", command=run_program)
run_button.pack()

root.mainloop()
