import os

# Set the path to the directory containing the files
folder_path = './_databases/Isilo/'  # Replace with the path to your directory

# Loop through all files in the directory
for filename in os.listdir(folder_path):
    file_path = os.path.join(folder_path, filename)

    # Check if it's a file, not a directory
    if os.path.isfile(file_path):
        try:
            # Try to open the file with Windows-1252 encoding
            with open(file_path, 'r', encoding='windows-1252') as file:
                content = file.read()

            # If successful, write the content to a new file with UTF-8 encoding
            with open(file_path, 'w', encoding='utf-8') as file:
                file.write(content)

            print(f"Converted {filename} from Windows-1252 to UTF-8 encoding.")

        except UnicodeDecodeError:
            print(f"File {filename} is not in Windows-1252 encoding, skipped conversion.")
        except Exception as e:
            print(f"Error processing {filename}: {e}")

print("Conversion check and process complete.")
