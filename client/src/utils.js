export const isJsonString = (data) => {
    try {
        JSON.parse(data)   
    } catch (error) {
        return false
    }
    return true
}

export const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

export const getLevelKeys = (items1) => {
    const key = {}
    const func = (items2, level = 1) => {
        items2.forEach((item) => {
        if (item.key) {
            key[item.key] = level
        }
        if (item.children) {
            func(item.children, level + 1);
        }
        })
    }
    func(items1)
    return key
    }