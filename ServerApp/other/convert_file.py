from docx import Document
import io

async def get_docx_file(file: bytes, file_name: str, file_id: int) -> str:
    stream_io = io.BytesIO(file) #Временный файл
    path_file = "other/doc/{}_{}".format(file_name, file_id)
    new_document = Document(stream_io)
    new_document.save(path_or_stream=path_file)
    return path_file