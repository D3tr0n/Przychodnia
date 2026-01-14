using api.Dtos.Account;
using api.Dtos.Doctor; // Dodaj ten import
using api.Models;

namespace api.Mappers
{
    public static class DoctorMappers
    {
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