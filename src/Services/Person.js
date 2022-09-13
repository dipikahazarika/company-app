import { service } from "../Plugins/axiosx";

export async function savePersonInfo(formData) {
    if (formData._id) {
        return await service.put("/person/" + formData._id, {
            name: formData.name,
            address: formData.address,
            companyId: formData.companyId,
        });
    }

    let $data = new FormData();
    $data.append("name", formData.name);
    $data.append("address", formData.address);
    $data.append("companyId", formData.companyId);

    return await service.post("/person", formData);
}

export async function getPersonInfo(personId) {
    const { data } = await service.get("/person/" + personId);
    return data;
}

export async function findPeopleByCompanyId(companyId) {
    const { data } = await service.get("/companies/" + companyId + "/people");
    return data;
}

export async function deletePersonById(personId) {
    const { data } = await service.delete("/person/" + personId);
    return data;
}
