import { CleanCodeElement } from "./CleanCodeElement.js";
import { CleanCodeElementsGroup } from "./CleanCodeElementsGroup.js";

let notUsedElementNamePattern = "not_used_";

let cleanCodeGroups = CreateCleanCodeGroups();

FillInCleanCodeElementsContainer(cleanCodeGroups);

SetRanges(cleanCodeGroups);

function SetRanges(cleanCodeGroups) {
    cleanCodeGroups.forEach(group => {
        SetRange({ currentTarget: { GroupId: group.GroupId } });
    });
}

function FillInCleanCodeElementsContainer(cleanCodeGroups) {
    let elementsContainer = document.getElementById("elements-container");

    cleanCodeGroups.forEach(group => {
        let div = CreateDivForCleanCodeElements(group);
        elementsContainer.appendChild(div);
    });
}

function CreateDivForCleanCodeElements(group) {
    let divForElements = document.createElement("div");

    let classAttribute = document.createAttribute("class");
    classAttribute.value = "elementsgroup";
    divForElements.setAttributeNode(classAttribute);

    AppendHeader(group.Title, divForElements);
    AppendElements(group.Elements, group.GroupId, divForElements);
    AppendStatusBar(group.GroupId, divForElements);

    return divForElements;
}

function AppendHeader(title, divForElements) {
    let groupHeader = document.createElement("h2");
    let groupHeaderText = document.createTextNode(title);
    groupHeader.appendChild(groupHeaderText);

    divForElements.appendChild(groupHeader);
}

function AppendElements(elementsInGroup, groupId, divForElements) {
    let elementValue = 0;

    elementsInGroup.forEach(element => {
        divForElements.appendChild(CreateElementSpan(element, elementValue, groupId));

        elementValue += 1;
    });
}

function CreateElementSpan(element, elementValue, groupId) {
    let elementSpan = document.createElement("span");
    let classAttribute = document.createAttribute("class");
    classAttribute.value = "elementitem";
    elementSpan.setAttributeNode(classAttribute);

    let checkbox = CreateElementCheckbox(elementValue, groupId);
    let label = CreateLabelForElement(element, checkbox.getAttribute("id"));
    let notUsedCheckbox = CreateNotUsedElementCheckbox(elementValue, groupId, notUsedElementNamePattern);

    elementSpan.appendChild(checkbox);
    elementSpan.appendChild(label);
    elementSpan.appendChild(notUsedCheckbox);

    return elementSpan;
}

function AppendStatusBar(groupId, divForElements) {
    let range = CreateRangeElement(groupId);
    divForElements.appendChild(range);

    let label = CreateLabelForRangeElement(groupId, range.getAttribute("id"));
    divForElements.appendChild(label);
}

function CreateElementCheckbox(elementValue, groupId) {
    let elementId = `${elementValue}_${groupId}`;
    let input = CreateCheckbox(elementId, groupId, elementValue);

    input.addEventListener('click', SetRange, false);
    input.ElementId = groupId;
    input.GroupId = groupId;

    return input;
}

function CreateNotUsedElementCheckbox(elementValue, groupId, namePattern) {
    let elementId = `${elementValue}_${groupId}`;
    let name = `${namePattern}${groupId}`;
    let input = CreateCheckbox(elementId, name, elementValue);

    let classAttribute = document.createAttribute("class");
    classAttribute.value = "tooltip";

    input.setAttributeNode(classAttribute);

    // let spanTooltip = document.createElement("span");
    // let tooltip = document.createTextNode("Not used");
    // spanTooltip.appendChild(tooltip);

    // let tooltipClassAttribute = document.createAttribute("class");
    // tooltipClassAttribute.value = "tooltiptext";
    // spanTooltip.setAttributeNode(tooltipClassAttribute);

    // input.appendChild(spanTooltip);

    input.addEventListener('click', SetRange, false);
    input.ElementId = groupId;
    input.GroupId = groupId;

    return input;
}

function CreateCheckbox(id, name, value) {
    let input = document.createElement("input");

    let idAttribute = document.createAttribute("id");
    idAttribute.value = id;

    let typeAttribute = document.createAttribute("type");
    typeAttribute.value = "checkbox";

    let nameAttribute = document.createAttribute("name");
    nameAttribute.value = name;

    let valueAttribute = document.createAttribute("value");
    valueAttribute.value = value;

    input.setAttributeNode(idAttribute);
    input.setAttributeNode(typeAttribute);
    input.setAttributeNode(nameAttribute);
    input.setAttributeNode(valueAttribute);

    return input;
}

function CreateLabelForElement(element, targetId) {
    let label = CreateLabel(targetId);
    let text = element.Text;

    if (element.Tooltip !== '') {
        let classAttribute = document.createAttribute("class");
        classAttribute.value = "tooltip";

        label.setAttributeNode(classAttribute);

        text += `<span class="tooltiptext">${element.Tooltip}</span>`;
    }

    label.innerHTML = text;

    return label;
}

function CreateRangeElement(groupId) {
    let rangeIdPattern = "id_range_";
    let rangeId = `${rangeIdPattern}${groupId}`

    return CreateDisabledRange(rangeId);
}

function CreateDisabledRange(id) {
    let range = document.createElement("input");

    let rangeIdAttribute = document.createAttribute("id");
    rangeIdAttribute.value = id;

    let typeAttribute = document.createAttribute("type");
    typeAttribute.value = "range";

    let disabledAttribute = document.createAttribute("disabled");

    range.setAttributeNode(rangeIdAttribute);
    range.setAttributeNode(typeAttribute);
    range.setAttributeNode(disabledAttribute);

    return range;
}

function CreateLabelForRangeElement(groupId, targetId) {
    let label = CreateLabel(targetId);

    let labelForRangeIdPattern = "label_range_";
    let labelId = `${labelForRangeIdPattern}${groupId}`
    let idAttribute = document.createAttribute("id");
    idAttribute.value = labelId;

    label.setAttributeNode(idAttribute);

    return label;
}

function CreateLabel(targetId) {
    let label = document.createElement("label");

    let forAttribute = document.createAttribute("for");
    forAttribute.value = targetId;

    label.setAttributeNode(forAttribute);

    return label;
}

function SetRange(evt) {
    let groupId = evt.currentTarget.GroupId;

    if (groupId.includes(notUsedElementNamePattern)) {
        groupId = groupId.substring(notUsedElementNamePattern.length);
    }

    let notUsedElementsInGroup = document.getElementsByName(`${notUsedElementNamePattern}${groupId}`);
    let selectedNotUsedElements = Array.from(notUsedElementsInGroup).filter(x => x.checked);

    let cleanCodeElementsInGroup = document.getElementsByName(groupId);
    let cleanCodeElementsArray = Array.from(cleanCodeElementsInGroup);
    let cleanCodeElementsCouldBeApplied = cleanCodeElementsArray.filter(x => selectedNotUsedElements.findIndex(el => el.value === x.value) === -1);
    let appliedElements = cleanCodeElementsCouldBeApplied.filter(x => x.checked);

    console.log(selectedNotUsedElements.map(x => x.value));
    console.log(appliedElements.map(x => x.value))
    console.log(appliedElements.length);

    UpdateStatusBar(groupId, appliedElements.length, cleanCodeElementsCouldBeApplied.length);
}

function UpdateStatusBar(groupId, selectedElementsCount, numberOfElements) {
    let range = document.getElementById(`id_range_${groupId}`);

    SetRangeElementValues(range, 0, numberOfElements, selectedElementsCount);

    let text = `${selectedElementsCount}/${numberOfElements}`

    let label_range_naming = document.getElementById(`label_range_${groupId}`);
    label_range_naming.innerText = text;
}

function SetRangeElementValues(range, min, max, currentValue) {
    range.min = min;
    range.max = max;
    range.value = currentValue;
}

function CreateCleanCodeGroups() {
    let cleanCodeGroups = [];

    cleanCodeGroups.push(CreateNamingGroup());
    cleanCodeGroups.push(CreateWritingGroup());
    cleanCodeGroups.push(CreateCommentingGroup());

    return cleanCodeGroups;
}

function CreateNamingGroup() {
    let title = "Naming code elements";
    let groupId = "naming_code_elements";
    let elementsInGroup = [
        new CleanCodeElement('Used <b>verbs</b> for method names', 'Tooltip text'),
        new CleanCodeElement('Used <b>nouns</b> for class and/or object names', ''),
        new CleanCodeElement('<u><i>Short</i></u> name for <b>variables</b> with <u><i>small</i></u> scope', ''),
        new CleanCodeElement('The <u><i>larger</i></u> the scope of a <b>function or method</b>, the <u><i>shorter</i></u> the name assign to it', ''),
        new CleanCodeElement('Used business terms for well-designed business domain task', ''),
        new CleanCodeElement('When implementing a task for a well-described solution domain (e.g., algorithms and design patterns), use existing domain terms to name variables, functions, and classes (e.g., BubbleSort)', ''),
        new CleanCodeElement('Avoid using words that provide no additional information about a variable', 'e.g., the, info, data'),
        new CleanCodeElement('Use full words instead of hard-to-pronounce and hard-to-read abbreviations to name variables, functions, and classes (e.g., ProgramManager instead of PrgMgr)', ''),
        new CleanCodeElement('Avoid using the same word for different purposes', 'e.g., when <u><i>add</i></u> methods are different, use <i>"Insert"</i> or <i>"Append"</i> to name a new method'),
        new CleanCodeElement('If there are synonymous options for naming functions with similar purposes (e.g., get, retrieve, fetch), stick to one word in different classes (e.g., getFile or getAllImages instead of getAllDocuments, retrieveFile, fetchStalemates)', ''),
        new CleanCodeElement('Constants used appropriately', 'When <i>numbers</i> and <i>strings</i> have values with unexplained meanings or occur in code many times, replace them with named constants (e.g., <i>SecondsOfYear</i> instead of 31536000 or <i>AuthenticationToken</i> instead of "I6hdfb39")'),
    ];
    let group = new CleanCodeElementsGroup(groupId, title);
    elementsInGroup.forEach(text => { group.AddElement(text) });

    return group;
}

function CreateWritingGroup() {
    let title = "Writing Functions/Methods";
    let groupId = "writing_code_elements";
    let elementsInGroup = [
        new CleanCodeElement('Functions <b>doesn`t</b> mutate (modify) input parameters', ''),
        new CleanCodeElement('Functions do not return NULL', 'Too many text for one small tooltip'),
        new CleanCodeElement('Separate functions and methods that change state (commands) from those that get data (queries)', ''),
        new CleanCodeElement('Ensure your function or method performs only what its name implies', ''),
        new CleanCodeElement('Use error codes only when you can`t use exceptions', ''),
        new CleanCodeElement('Avoid writing functions and methods with more than three arguments', ''),
        new CleanCodeElement('Extract functions and methods from multiline nested blocks to ensure one level of abstraction', ''),
        new CleanCodeElement('When calling functions or methods, avoid passing null as an argument', ''),
        new CleanCodeElement('Avoid using a Boolean flag as a method parameter to split execution flows', ''),
        new CleanCodeElement('Ensure each function or method has the strictest access modifier possible', ''),
        new CleanCodeElement('When writing functions or methods, check to make sure their argument is null', ''),
        new CleanCodeElement('Declare variables as close as possible to the code line where they are first used', ''),
    ];
    let group = new CleanCodeElementsGroup(groupId, title);
    elementsInGroup.forEach(text => { group.AddElement(text) });

    return group;
}

function CreateCommentingGroup() {
    let title = "Commenting";
    let groupId = "commenting_code_elements";
    let elementsInGroup = [
        new CleanCodeElement('Avoid comments unless they clarify unobvious context, which is not immediately clear when reading the code', ''),
        new CleanCodeElement('Add comments to provide context that a reviewer can`t get from the code, user story, or pull request', ''),
        new CleanCodeElement('Add comments to save other programmers time figuring out the reason for a decision', ''),
        new CleanCodeElement('Add comments to warn other programmers about certain consequences', 'e.g., when a method depends on a variable value'),
        new CleanCodeElement('Leave "TODO" comments to explain why a function has a poor or incomplete implementation and what that function should be', ''),
    ];
    let group = new CleanCodeElementsGroup(groupId, title);
    elementsInGroup.forEach(text => { group.AddElement(text) });

    return group;
}

// document level code
var tooltips = document.querySelectorAll('.tooltiptext');

document.addEventListener('mousemove', cursorOver, false);

function cursorOver(e) {
    tooltips.forEach(tooltip => {
        if (tooltip.clientHeight !== 0) {
            tooltip.style.left = e.clientX + 'px';
            tooltip.style.top = e.clientY - tooltip.clientHeight + 'px';
        }
    });
}