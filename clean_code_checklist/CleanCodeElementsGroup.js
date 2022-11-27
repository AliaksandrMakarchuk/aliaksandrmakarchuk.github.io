export class CleanCodeElementsGroup {
    constructor(groupId, title) {
        this.GroupId = groupId;
        this.Title = title;
        this.Elements = [];
    }

    AddElement = function (text) {
        this.Elements.push(text);
    }
}