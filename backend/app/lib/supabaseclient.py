from supabase import create_client
import os
import time

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_ANON_KEY")
SUPABASE_BUCKET = os.environ.get("SUPABASE_BUCKET")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

def upload_student_photo(student_id, photo_file):
    """
    Upload a student photo directly to Supabase Storage.
    photo_file: werkzeug.datastructures.FileStorage
    """
    try:
        # Unique filename
        ext = photo_file.filename.rsplit(".", 1)[-1].lower()
        file_name = f"{student_id}_{int(time.time())}.{ext}"

        # Read bytes from Flask FileStorage
        file_bytes = photo_file.read()

        # Upload directly from memory
        res = supabase.storage.from_(SUPABASE_BUCKET).upload(
            path=file_name,
            file=file_bytes,
            file_options={"content-type": photo_file.mimetype}
        )

        if hasattr(res, "error") and res.error:
            print("Supabase upload error:", res.error)
            return None

        # Get the public URL
        public_url = supabase.storage.from_(SUPABASE_BUCKET).get_public_url(file_name)

        return public_url

    except Exception as e:
        print("Upload exception:", e)
        print("Bucket:", SUPABASE_BUCKET)
        return None
