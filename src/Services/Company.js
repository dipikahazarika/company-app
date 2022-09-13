import { service } from "../Plugins/axiosx";

export async function getList() {
    const { data } = await service.get("/companies");

    return data;
}

export async function saveCompanyInfo(formData) {
    if (formData._id) {
        return await service.put("/companies/" + formData._id, {
            name: formData.name,
            address: formData.address,
            revenue: formData.revenue,
            phone: formData.phone,
        });
    }

    let $data = new FormData();
    $data.append("name", formData.name);
    $data.append("address", formData.address);
    $data.append("revenue", formData.revenue);
    $data.append("phone", formData.phone);

    return await service.post("/companies", formData);
}

export async function getCompanyInfo(companyId) {
    const { data } = await service.get("/companies/" + companyId);
    return data;
}
