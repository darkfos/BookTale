from docx import Document
import io

async def get_docx_file(file: bytes, file_name: str, file_id: int) -> str:

    path_file = "other/doc/{}_{}".format(file_name, file_id)
    stream_io = io.BytesIO(file) #Временный файл
    try:
        #Docx
        new_document = Document(stream_io)
        new_document.save(path_or_stream=path_file)
        return path_file
    except Exception as ex:
        #Pdf
        stream_io.seek(0) #Возвращение указателя на начало файла
        with open(path_file+".pdf", "wb") as pdf_file:
            pdf_file.write(stream_io.read())
        return path_file+".pdf"