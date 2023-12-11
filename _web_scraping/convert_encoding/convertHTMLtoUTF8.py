import os
import html

def convert_file(file_path):
    try:
        # Open the file with Windows 1252 encoding
        with open(file_path, 'r', encoding='windows-1252') as file:
            content = file.read()

        # Convert HTML entities to their corresponding characters
        decoded_content = html.unescape(content)

        # Write the content to a new file with UTF-8 encoding
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(decoded_content)

        return f"Converted {os.path.basename(file_path)} to UTF-8 encoding and decoded HTML entities."
    except Exception as e:
        return f"Error converting {os.path.basename(file_path)}: {e}"


# Set the path to the directory containing the files
files = [
    './_databases/Isilo/AdvSem01.htm',
    './_databases/Isilo/AdvSem02.htm',
    './_databases/Isilo/AdvSem03.htm',
    './_databases/Isilo/AdvSem04.htm',
]

for file in files:
    convert_file(file)
