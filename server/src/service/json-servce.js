const fs = require('fs');

class JSONService{
    // Функция для чтения JSON файла
readJsonFile(filename) {
    try {
        const data = fs.readFileSync(filename, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading JSON file:', error);
        return [];
    }
}

// Функция для записи данных в JSON файл
writeJsonFile(filename, data) {
    try {
        fs.writeFileSync(filename, JSON.stringify(data, null, 2));
        console.log('Data written to JSON file successfully.');
    } catch (error) {
        console.error('Error writing data to JSON file:', error);
    }
}

// Функция для добавления данных в JSON файл
appendToJsonFile(filename, newData) {
    try {
        // Чтение существующих данных из файла
        const existingData = this.readJsonFile(filename);

        // Добавление новых данных к существующим данным
        const updatedData = [...existingData, newData];

        // Запись обновленных данных обратно в файл
        this.writeJsonFile(filename, updatedData);
    } catch (error) {
        console.error('Error appending data to JSON file:', error);
    }
}

// Функция для удаления данных из JSON файл
deleteFromJsonFile(filename, idToDelete) {
    try {
        // Чтение существующих данных из файла
        const existingData = readJsonFile(filename);

        // Фильтрация данных для удаления по определенному критерию (например, по ID)
        const updatedData = existingData.filter(item => item.id !== idToDelete);

        // Запись обновленных данных обратно в файл
        fs.writeFileSync(filename, JSON.stringify(updatedData, null, 2));
        console.log('Data deleted from JSON file successfully.');
    } catch (error) {
        console.error('Error deleting data from JSON file:', error);
    }
}
}

module.exports = new JSONService();