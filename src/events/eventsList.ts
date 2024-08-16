export interface SimpleEvent
{
    //need a way to validate this eventually
    eventKey: string;
    //might be a better way to type this, but im pretty sure that outright defining the parameters screws up the event registering
    func: any;
}

//nothing here yet, it is function thoughs
export const eventList: SimpleEvent[] = []
