using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<List<ActivityDto>> { }


        public class Handler : IRequestHandler<Query, List<ActivityDto>>
        {
            private readonly DataContext _contex;
            public readonly IMapper _mapper ;
            public Handler(DataContext contex, IMapper mapper)
            {
                _mapper = mapper;
                _contex = contex;

            }
            public async Task<List<ActivityDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activities = await _contex.Activities
                .ToListAsync();

                return _mapper.Map<List<Activity>, List<ActivityDto>>(activities);
            }
        }
    }
}