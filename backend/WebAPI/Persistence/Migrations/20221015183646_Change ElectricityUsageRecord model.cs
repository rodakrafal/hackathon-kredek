using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    public partial class ChangeElectricityUsageRecordmodel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ElectricityUsageRecords_Areas_AreaId",
                table: "ElectricityUsageRecords");

            migrationBuilder.DropColumn(
                name: "XPosition",
                table: "ElectricityUsageRecords");

            migrationBuilder.DropColumn(
                name: "YPosition",
                table: "ElectricityUsageRecords");

            migrationBuilder.AddColumn<Guid>(
                name: "RecordId",
                table: "Points",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "AreaId",
                table: "ElectricityUsageRecords",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "TEXT");

            migrationBuilder.AddColumn<Guid>(
                name: "PointId",
                table: "ElectricityUsageRecords",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_ElectricityUsageRecords_PointId",
                table: "ElectricityUsageRecords",
                column: "PointId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ElectricityUsageRecords_Areas_AreaId",
                table: "ElectricityUsageRecords",
                column: "AreaId",
                principalTable: "Areas",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ElectricityUsageRecords_Points_PointId",
                table: "ElectricityUsageRecords",
                column: "PointId",
                principalTable: "Points",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ElectricityUsageRecords_Areas_AreaId",
                table: "ElectricityUsageRecords");

            migrationBuilder.DropForeignKey(
                name: "FK_ElectricityUsageRecords_Points_PointId",
                table: "ElectricityUsageRecords");

            migrationBuilder.DropIndex(
                name: "IX_ElectricityUsageRecords_PointId",
                table: "ElectricityUsageRecords");

            migrationBuilder.DropColumn(
                name: "RecordId",
                table: "Points");

            migrationBuilder.DropColumn(
                name: "PointId",
                table: "ElectricityUsageRecords");

            migrationBuilder.AlterColumn<Guid>(
                name: "AreaId",
                table: "ElectricityUsageRecords",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "XPosition",
                table: "ElectricityUsageRecords",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "YPosition",
                table: "ElectricityUsageRecords",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_ElectricityUsageRecords_Areas_AreaId",
                table: "ElectricityUsageRecords",
                column: "AreaId",
                principalTable: "Areas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
