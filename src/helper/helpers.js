import statesData from '../content/states_titlecase.json'


export const slugify = (str) =>
    str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");

export const getFullStateName = (stateCode) => {
    const stateInfo = statesData.state_list.find((data) => data.abbreviation === stateCode)
    return stateInfo ? stateInfo?.name : stateCode
}