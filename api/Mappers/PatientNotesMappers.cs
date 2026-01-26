using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.PatientNotes;
using api.Models;

namespace api.Mappers
{
    public static class PatientNotesMappers
    {
        public static PatientNotesDto ToPatientNotesDto(this PatientNotes patientnotesModel)
        {
            return new PatientNotesDto
            {
                Content = patientnotesModel.Content,
                CreatedOn = patientnotesModel.CreatedOn
            };
        }
        public static PatientNotes ToPatientNotesFromCreateDto(this CreatePatientNotesRequestDto createPatientNotesRequestDto)
        {
            return new PatientNotes
            {

                Content = createPatientNotesRequestDto.Content,
                CreatedOn = createPatientNotesRequestDto.CreatedOn
            };
        }
    }
}