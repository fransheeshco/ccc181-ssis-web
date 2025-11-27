from supabase import create_client
import os
import time
import uuid

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_ANON_KEY")
SUPABASE_BUCKET = os.environ.get("SUPABASE_BUCKET")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

def upload_student_photo(photo_file):
    try:
        ext = photo_file.filename.rsplit(".", 1)[-1].lower()
        file_name = f"{uuid.uuid4()}.{ext}"

        file_bytes = photo_file.read()

        res = supabase.storage.from_(SUPABASE_BUCKET).upload(
            path=file_name,
            file=file_bytes,
            file_options={"content-type": photo_file.mimetype}
        )

        # If upload succeeded:
        public_url = supabase.storage.from_(SUPABASE_BUCKET).get_public_url(file_name)
        return {
            "file_name": file_name,
            "public_url": public_url
        }

    except Exception as e:
        print("🔥 EXCEPTION RAISED BY SUPABASE:", e)

        # Convert exception to string
        err_str = str(e)

        # Detect the common Supabase file-too-large error
        if "Payload too large" in err_str or "413" in err_str:
            return {
                "error": "Payload too large",
                "message": "The file exceeds the maximum upload size."
            }

        # Fallback for unknown errors
        return {
            "error": "Upload failed",
            "message": err_str
        }


def delete_student_photo(file_name):
    """
    Delete a student photo from Supabase Storage.
    file_name: the filename stored in Supabase (not the full URL)
    """
    try:
        if not file_name:
            print("No file specified for deletion.")
            return False

        # Remove the file from Supabase Storage
        res = supabase.storage.from_(SUPABASE_BUCKET).remove([file_name])

        if hasattr(res, "error") and res.error:
            print("Supabase deletion error:", res.error)
            return False

        print(f"File {file_name} deleted successfully.")
        return True

    except Exception as e:
        print("Deletion exception:", e)
        return False
