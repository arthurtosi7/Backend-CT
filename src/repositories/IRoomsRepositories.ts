import Room from "src/models/Room";
import Person from "src/models/Person";

interface IRoomsRepository {

    /**
     * Generate a new room with the given number of beds and the email of the person who wii be in the room.
     * WARNING: A room need to have at least one person in it.
     * @param qtd_camas numeric value of the number of beds in the room
     * @param email email of the person who will be in the room
     */
    create(qtd_camas: number): Promise<void>;

    /**
     * List all rooms
     */
    findAll(): Promise<Room[]>;

    /**
     * Find a room by its ID
     * @param id ID of the room
     */
    findById(id: string): Promise<Room>;

    /**
     * Update the number of beds in a room
     * @param room_id ID of the room to be updated
     * @param qtd_camas new number of beds in the room
     */
    update(room_id: string, qtd_camas: number): Promise<void>;

    /**
     * Insert a person in a room
     * @param room room where the person will be inserted
     * @param email email of the person to be inserted
     */
    insertPerson(room: Room, Person: Person): Promise<void>;

    /**
     * Remove a person from a room
     * @param room room where the person will be removed
     * @param email email of the person to be removed
     */
    removePerson(room: Room, email: string): Promise<void>;

    /**
     * Delete a room
     * @param room room to be deleted
     */
    delete(room: Room): Promise<void>;

    /**
     * 
     * @param room room to be checked
     * @returns true if the room is full, false otherwise
     */
    roomIsFull (room: Room): Promise<boolean>;

    /**
     * @param room room to be checked
     * @returns true if the room is empty, false otherwise
     */
    roomIsEmpty (room: Room): Promise<boolean>;

    listPeopleInsideRoom(room: Room): Promise<string[]>;
}

export default IRoomsRepository;