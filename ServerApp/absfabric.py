from abc import abstractclassmethod, ABC


class DatabaseService(ABC):

    @abstractclassmethod
    def get_one(*args, **kwargs):
        pass

    @abstractclassmethod
    def get_all(*args, **kwargs):
        pass

    @abstractclassmethod
    def add_one(*args, **kwargs):
        pass

    @abstractclassmethod
    def update_one(*args, **kwargs):
        pass

    @abstractclassmethod
    def delete_one(*args, **kwargs):
        pass