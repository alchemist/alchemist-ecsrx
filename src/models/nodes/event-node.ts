import {Node, NodeType, Point} from "@alchemist-editor/core";
import {withRuleset} from "@treacherous/decorators";

import {EventData} from "../data/event-data";

export class EventNode extends Node<EventData>
{
    public static NodeType = new NodeType("ecsrx-event", "Event");

    @withRuleset(EventData)
    public data: EventData;

    constructor(data: EventData = new EventData(), position?: Point)
    {
        super(EventNode.NodeType, position);
        this.data = data;
    }
}