import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'NavItem', database: 'AccessControl' })
export class Menu {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  ApplicationId: string;

  @Column()
  name: string;

  @Column()
  controller: string;

  @Column()
  action: string;

  @Column()
  isParent: boolean;

  @Column()
  children: Menu[];
}
