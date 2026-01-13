using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class LaczenieKont : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AccountId",
                table: "Doctors",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "AccountId1",
                table: "Doctors",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Doctors_AccountId1",
                table: "Doctors",
                column: "AccountId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Doctors_AspNetUsers_AccountId1",
                table: "Doctors",
                column: "AccountId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Doctors_AspNetUsers_AccountId1",
                table: "Doctors");

            migrationBuilder.DropIndex(
                name: "IX_Doctors_AccountId1",
                table: "Doctors");

            migrationBuilder.DropColumn(
                name: "AccountId",
                table: "Doctors");

            migrationBuilder.DropColumn(
                name: "AccountId1",
                table: "Doctors");
        }
    }
}
