-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_moves" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "power" INTEGER NOT NULL DEFAULT 0,
    "pp" INTEGER NOT NULL DEFAULT 0,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "type_id" INTEGER NOT NULL,
    "accuracy" INTEGER NOT NULL DEFAULT 0,
    "chance" INTEGER NOT NULL DEFAULT 0,
    "short_effect" TEXT NOT NULL DEFAULT '',
    "damage_class_id" INTEGER NOT NULL,
    CONSTRAINT "moves_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "element_types" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "moves_damage_class_id_fkey" FOREIGN KEY ("damage_class_id") REFERENCES "damage_classes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_moves" ("accuracy", "chance", "damage_class_id", "id", "name", "power", "pp", "priority", "short_effect", "type_id") SELECT "accuracy", "chance", "damage_class_id", "id", "name", "power", "pp", "priority", "short_effect", "type_id" FROM "moves";
DROP TABLE "moves";
ALTER TABLE "new_moves" RENAME TO "moves";
CREATE UNIQUE INDEX "moves_id_key" ON "moves"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
