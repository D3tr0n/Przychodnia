using api.Dtos.Account;
using api.Dtos.Doctor; // Dodaj ten import
using api.Models;

namespace api.Mappers
{
    public static class DoctorMappers
    {
        // Z DTO rejestracji -> do Bazy (używane w AccountController)
        public static Doctor ToDoctorFromRegisterDto(this RegisterDoctorDto doctorDto, string accountId)
        {
            return new Doctor
            {
                FirstName = doctorDto.FirstName,
                LastName = doctorDto.LastName,
                Specialization = doctorDto.Specialization,
                AccountId = accountId
            };
        }

        // Z Bazy -> do DTO (używane np. w GetProfile lub liście lekarzy)
        public static DoctorDto ToDoctorDto(this Doctor doctorModel)
        {
            return new DoctorDto
            {
                Id = doctorModel.Id,
                FirstName = doctorModel.FirstName,
                LastName = doctorModel.LastName,
                Specialization = doctorModel.Specialization
            };
        }
    }
}