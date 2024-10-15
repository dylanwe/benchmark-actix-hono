use actix_web::{get, post, middleware::Logger, web::{Json, scope}, App, HttpResponse, HttpServer, Responder};
use serde::{Deserialize, Serialize};
mod aoc_2021_dive;
use aoc_2021_dive::dive_solve;

#[derive(Serialize, Debug)]
struct HealthCheck {
    message: String,
}

#[get("/healthz")]
async fn health_check() -> impl Responder {
    let body = HealthCheck {
        message: String::from("It's alive!"),
    };

    return HttpResponse::Ok().json(body);
}

#[derive(Serialize, Debug)]
struct Submarine {
    id: i32,
    name: String,
    depth_in_meters: i32,
}

#[get("/submarine")]
async fn get_submarine() -> impl Responder {
    let submarine = Submarine {
        id: 1,
        name: String::from("The Ahab"),
        depth_in_meters: 100,
    };

    return HttpResponse::Ok().json(submarine);
}

#[derive(Serialize, Deserialize, Debug)]
struct DiveInstructions {
    instructions: String,
}

#[derive(Serialize, Deserialize, Debug)]
struct DiveResult {
    result: i32,
}

#[derive(Serialize, Deserialize, Debug)]
struct DiveError {
    message: String,
}

#[post("/dive")]
async fn dive(instructions: Json<DiveInstructions>) -> impl Responder {
    let instructions = instructions.into_inner();
    return match dive_solve(&instructions.instructions) {
        Ok(result) => HttpResponse::Ok().json(DiveResult { result }),
        Err(_) => {
            HttpResponse::BadRequest()
                .json(DiveError { message: "Could not calculate answer".to_string() })
        }
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));

    HttpServer::new(|| {
        App::new()
            .wrap(Logger::default())
            .service(health_check)
            .service(
                scope("/api/v1")
                    .service(get_submarine)
                    .service(dive)
            )
    })
    .bind(("0.0.0.0", 8080))?
    .run()
    .await
}

