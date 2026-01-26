using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Patient;
using api.Models;

namespace api.Mappers
{
    public static class PatientMappers
    {
        public static PatientDto ToPatientDto(this Patient patientModel)
        {
            return new PatientDto
            {
                Id = patientModel.Id,
                FirstName = patientModel.FirstName,
                LastName = patientModel.LastName,
                DateOfBirth = patientModel.DateOfBirth
            };
        }
    }
}