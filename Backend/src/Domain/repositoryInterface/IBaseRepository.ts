export interface IBaseRepository<T> {
    create(entity: T): Promise<T>
    findById(id: string): Promise<T | null >
    findAll(): Promise<T[]>
    update(id: string, data: Partial<T>): Promise<T | null >
    // save(id: string, data: Partial<D>): Promise<D | null>
    // findByEmail(email: string): Promise<T | null>
}